from typing import Any, Optional
from pydantic import BaseModel, EmailStr


class UserRequestSchema(BaseModel):
    name: str
    email: EmailStr
    password: str
    user_id: Optional[int]


class DefaultResponse(BaseModel):
    status: str = "Failed"
    message: Optional[str]
    data: Optional[Any]


class ResponseModel(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True
