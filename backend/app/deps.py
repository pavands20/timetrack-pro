"""Session token helpers and the current-user dependencies other routers import."""

import os
from datetime import UTC, datetime, timedelta
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User

COOKIE_NAME = "session"
TOKEN_TTL = timedelta(hours=8)
ISSUER = "timetrack-pro"
AUDIENCE = "timetrack-pro-web"
ADMIN_ROLES = ("system_admin", "payroll_admin")


def _secret() -> str:
    return (
        os.getenv("JWT_SECRET_KEY")
        or os.getenv("SECRET_KEY")
        or "dev-insecure-jwt-secret-change-me-0123456789"
    )


def create_token(user: User) -> str:
    now = datetime.now(UTC)
    claims = {
        "sub": user.id,
        "iss": ISSUER,
        "aud": AUDIENCE,
        "iat": now,
        "exp": now + TOKEN_TTL,
    }
    return jwt.encode(claims, _secret(), algorithm="HS256")


def _unauthorized() -> HTTPException:
    return HTTPException(status_code=401, detail="Not authenticated")


def get_current_user(request: Request, db: Annotated[Session, Depends(get_db)]) -> User:
    header = request.headers.get("authorization", "")
    if header:
        scheme, _, token = header.partition(" ")
        if scheme.lower() != "bearer" or not token:
            raise _unauthorized()
    else:
        token = request.cookies.get(COOKIE_NAME, "")
    if not token:
        raise _unauthorized()
    try:
        claims = jwt.decode(
            token,
            _secret(),
            algorithms=["HS256"],
            issuer=ISSUER,
            audience=AUDIENCE,
            options={"require": ["exp", "sub", "iss", "aud"]},
        )
    except jwt.PyJWTError:
        raise _unauthorized() from None
    user = db.get(User, claims["sub"])
    if user is None or not user.is_active:
        raise _unauthorized()
    return user


def require_admin(user: Annotated[User, Depends(get_current_user)]) -> User:
    if user.role not in ADMIN_ROLES:
        raise HTTPException(status_code=403, detail="Forbidden")
    return user
