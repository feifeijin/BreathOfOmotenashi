from fastapi import APIRouter
from pydantic import BaseModel
from ..services.agora_service import generate_rtc_token
import random

router = APIRouter(prefix="/agora", tags=["agora"])


class TokenRequest(BaseModel):
    channel: str
    uid: int | None = None


@router.post("/token")
def get_rtc_token(req: TokenRequest):
    """Generate Agora RTC token for joining a channel."""
    uid = req.uid or random.randint(10000, 99999)
    return generate_rtc_token(req.channel, uid)
