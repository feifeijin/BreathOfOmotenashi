"""Agora RTC token generation service."""
import time
from ..core.config import settings

# pip install agora-token-builder
try:
    from agora_token_builder import RtcTokenBuilder, Role_Publisher
    AGORA_AVAILABLE = True
except ImportError:
    AGORA_AVAILABLE = False


def generate_rtc_token(channel: str, uid: int, role: str = "publisher") -> dict:
    """
    Generate Agora RTC token for a user to join a channel.
    Returns: { token, channel, uid, expires_at }
    """
    if not AGORA_AVAILABLE:
        return {"error": "agora-token-builder not installed"}

    expire_seconds = 3600  # 1 hour
    current_ts = int(time.time())
    privilege_expire_ts = current_ts + expire_seconds

    agora_role = Role_Publisher  # subscriber = 2

    token = RtcTokenBuilder.buildTokenWithUid(
        settings.AGORA_APP_ID,
        settings.AGORA_APP_CERTIFICATE,
        channel,
        uid,
        agora_role,
        privilege_expire_ts,
    )

    return {
        "token": token,
        "channel": channel,
        "uid": uid,
        "app_id": settings.AGORA_APP_ID,
        "expires_at": privilege_expire_ts,
    }
