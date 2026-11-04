"""Time handling: every timestamp is persisted as timezone-aware UTC (AC-098).

Use `utcnow()` for new values and the `UTCDateTime` column type for columns. The column
refuses naive datetimes, converts aware ones to UTC on the way in, and returns aware UTC
on the way out (SQLite drops the offset). Display in the company time zone is a
presentation concern and never changes what is stored.
"""

from datetime import UTC, datetime

from sqlalchemy import DateTime
from sqlalchemy.types import TypeDecorator


def utcnow() -> datetime:
    return datetime.now(UTC)


def iso_z(value: datetime) -> str:
    """ISO-8601 in UTC with a trailing Z."""
    return value.astimezone(UTC).isoformat().replace("+00:00", "Z")


class UTCDateTime(TypeDecorator):
    impl = DateTime(timezone=True)
    cache_ok = True

    def process_bind_param(self, value, dialect):
        if value is None:
            return None
        if value.tzinfo is None:
            raise ValueError("naive datetime: timestamps must be timezone-aware")
        return value.astimezone(UTC)

    def process_result_value(self, value, dialect):
        if value is None:
            return None
        if value.tzinfo is None:
            return value.replace(tzinfo=UTC)
        return value.astimezone(UTC)
