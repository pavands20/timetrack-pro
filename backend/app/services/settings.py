"""Company settings access. Labour rules are advisory: nothing here blocks any action."""

from dataclasses import dataclass

from sqlalchemy.orm import Session

from app.models import CompanySettings


@dataclass(frozen=True)
class LabourRules:
    company_time_zone: str
    daily_overtime_limit_hours: float
    weekly_overtime_limit_hours: float
    min_break_minutes: int
    break_after_hours: float


def get_settings(db: Session) -> CompanySettings:
    """The single settings row, created with defaults on first access."""
    row = db.get(CompanySettings, 1)
    if row is None:
        row = CompanySettings(id=1)
        db.add(row)
        db.commit()
    return row


def get_labour_rules(db: Session) -> LabourRules:
    """Reads the current values on every call, so edits apply without a restart."""
    row = get_settings(db)
    db.refresh(row)
    return LabourRules(
        company_time_zone=row.company_time_zone,
        daily_overtime_limit_hours=row.daily_overtime_limit_hours,
        weekly_overtime_limit_hours=row.weekly_overtime_limit_hours,
        min_break_minutes=row.min_break_minutes,
        break_after_hours=row.break_after_hours,
    )
