from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.agora_service import generate_rtc_token
import random
import httpx

router = APIRouter(prefix="/agora", tags=["agora"])

TEN_AGENT_URL = "http://ten_agent:8080"


class TokenRequest(BaseModel):
    channel: str
    uid: int | None = None


class StartAgentRequest(BaseModel):
    channel_name: str
    uid: int
    shrine_id: str | None = None


class StopAgentRequest(BaseModel):
    request_id: str


@router.post("/token")
def get_rtc_token(req: TokenRequest):
    """Generate Agora RTC token for joining a channel."""
    uid = req.uid or random.randint(10000, 99999)
    return generate_rtc_token(req.channel, uid)


@router.post("/start-agent")
async def start_agent(req: StartAgentRequest):
    """Start TEN Agent and have it join the specified Agora channel."""
    request_id = f"shrine-{req.channel_name}-{req.uid}"
    payload = {
        "request_id": request_id,
        "channel_name": req.channel_name,
        "uid": req.uid,
        "graph_name": "shrine_voice_guide",
        "properties": {
            "agora_rtc_extension": {
                "channel": req.channel_name,
                "uid": req.uid,
            }
        },
    }
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(f"{TEN_AGENT_URL}/start", json=payload)
            resp.raise_for_status()
            return {"request_id": request_id, **resp.json()}
    except httpx.RequestError as exc:
        raise HTTPException(status_code=503, detail=f"TEN Agent unreachable: {exc}")
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=exc.response.text)


@router.post("/stop-agent")
async def stop_agent(req: StopAgentRequest):
    """Stop a running TEN Agent session."""
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                f"{TEN_AGENT_URL}/stop",
                json={"request_id": req.request_id},
            )
            resp.raise_for_status()
            return resp.json()
    except httpx.RequestError as exc:
        raise HTTPException(status_code=503, detail=f"TEN Agent unreachable: {exc}")
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=exc.response.text)
