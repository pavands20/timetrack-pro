"""SQLAlchemy models."""

import uuid

from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

ROLES = ("employee", "manager", "payroll_admin", "system_admin")


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True)
    password_hash: Mapped[str | None] = mapped_column(String(255), nullable=True)
    role: Mapped[str] = mapped_column(String(20), default="employee")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


__all__ = ["Base", "ROLES", "User"]
