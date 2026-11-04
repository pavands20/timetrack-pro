"""Company settings: time zone and advisory labour rules."""

from datetime import datetime
from typing import Annotated
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field, StrictFloat, StrictInt, field_serializer, field_validator
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import get_current_user, require_admin
from app.models import User
from app.services.settings import get_settings
from app.services.timeutil import iso_z, utcnow

router = APIRouter(prefix="/api/settings", tags=["settings"])

Hours = Annotated[StrictFloat | StrictInt, Field(gt=0, le=168)]


class SettingsOut(BaseModel):
    company_time_zone: str
    daily_overtime_limit_hours: float
    weekly_overtime_limit_hours: float
    min_break_minutes: int
    break_after_hours: float
    updated_at: datetime

    @field_serializer("updated_at")
    def _ser(self, value: datetime) -> str:
        return iso_z(value)


class SettingsIn(BaseModel):
    company_time_zone: str | None = None
    daily_overtime_limit_hours: Hours | None = None
    weekly_overtime_limit_hours: Hours | None = None
    min_break_minutes: Annotated[StrictInt, Field(ge=0, le=1440)] | None = None
    break_after_hours: Hours | None = None

    @field_validator("company_time_zone")
    @classmethod
    def _zone(cls, value: str | None) -> str | None:
        if value is None:
            return value
        try:
            ZoneInfo(value)
        except (ZoneInfoNotFoundError, ValueError, OSError):
            raise ValueError("Unknown IANA time zone") from None
        return value


@router.get("", response_model=SettingsOut)
def read_settings(
    _user: Annotated[User, Depends(get_current_user)], db: Annotated[Session, Depends(get_db)]
) -> SettingsOut:
    return SettingsOut.model_validate(get_settings(db), from_attributes=True)


@router.put("", response_model=SettingsOut)
def update_settings(
    body: SettingsIn,
    _admin: Annotated[User, Depends(require_admin)],
    db: Annotated[Session, Depends(get_db)],
) -> SettingsOut:
    row = get_settings(db)
    for name, value in body.model_dump(exclude_none=True).items():
        setattr(row, name, float(value) if name.endswith("_hours") else value)
    row.updated_at = utcnow()
    db.commit()
    return SettingsOut.model_validate(row, from_attributes=True)
