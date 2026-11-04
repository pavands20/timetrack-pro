"""Email/password sign-in, sign-out and current-user endpoints."""

from typing import Annotated

from argon2 import PasswordHasher
from argon2.exceptions import InvalidHashError, VerificationError
from fastapi import APIRouter, Depends, HTTPException, Response
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import COOKIE_NAME, TOKEN_TTL, create_token, get_current_user
from app.models import User

router = APIRouter(prefix="/api/auth", tags=["auth"])

_hasher = PasswordHasher()
_DUMMY_HASH = _hasher.hash("not-a-real-password")
_GENERIC = "Invalid email or password"


class LoginRequest(BaseModel):
    email: str
    password: str


class UserOut(BaseModel):
    id: str
    email: str
    role: str


class LoginResponse(BaseModel):
    user: UserOut
    token: str


def _out(user: User) -> UserOut:
    return UserOut(id=user.id, email=user.email, role=user.role)


@router.post("/login", response_model=LoginResponse)
def login(
    body: LoginRequest, response: Response, db: Annotated[Session, Depends(get_db)]
) -> LoginResponse:
    email = body.email.strip().lower()
    user = db.scalar(select(User).where(User.email == email))
    stored = user.password_hash if user and user.password_hash else _DUMMY_HASH
    try:
        ok = _hasher.verify(stored, body.password)
    except (VerificationError, InvalidHashError):
        ok = False
    if not ok or user is None or not user.password_hash or not user.is_active:
        raise HTTPException(status_code=401, detail=_GENERIC)
    token = create_token(user)
    response.set_cookie(
        COOKIE_NAME,
        token,
        max_age=int(TOKEN_TTL.total_seconds()),
        httponly=True,
        secure=True,
        samesite="strict",
        path="/",
    )
    return LoginResponse(user=_out(user), token=token)


@router.post("/logout", status_code=204)
def logout() -> Response:
    response = Response(status_code=204)
    response.delete_cookie(COOKIE_NAME, path="/", httponly=True, secure=True, samesite="strict")
    return response


@router.get("/me", response_model=UserOut)
def me(user: Annotated[User, Depends(get_current_user)]) -> UserOut:
    return _out(user)
