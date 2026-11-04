"""SQLAlchemy models."""

import uuid
from datetime import datetime

from sqlalchemy import Boolean, Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.services.timeutil import UTCDateTime, utcnow

ROLES = ("employee", "manager", "payroll_admin", "system_admin")


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True)
    password_hash: Mapped[str | None] = mapped_column(String(255), nullable=True)
    role: Mapped[str] = mapped_column(String(20), default="employee")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


class CompanySettings(Base):
    """Single row (id=1): company time zone and advisory labour rules."""

    __tablename__ = "company_settings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, default=1)
    company_time_zone: Mapped[str] = mapped_column(String(64), default="Europe/London")
    daily_overtime_limit_hours: Mapped[float] = mapped_column(Float, default=8.0)
    weekly_overtime_limit_hours: Mapped[float] = mapped_column(Float, default=40.0)
    min_break_minutes: Mapped[int] = mapped_column(Integer, default=20)
    break_after_hours: Mapped[float] = mapped_column(Float, default=6.0)
    updated_at: Mapped[datetime] = mapped_column(UTCDateTime, default=utcnow)


__all__ = ["Base", "CompanySettings", "ROLES", "User"]
