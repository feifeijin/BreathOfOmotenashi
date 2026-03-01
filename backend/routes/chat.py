from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.knowledge_service import rag_chat
from ..services.minimax_service import text_to_speech
from fastapi.responses import Response

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []
    session_id: str | None = None


class ChatResponse(BaseModel):
    reply: str
    session_id: str | None = None


@router.post("", response_model=ChatResponse)
async def chat(req: ChatRequest):
    """RAG-powered chat endpoint."""
    try:
        reply = await rag_chat(req.message, req.history)
        return ChatResponse(reply=reply, session_id=req.session_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/tts")
async def tts(text: str, voice_id: str = "female-tianmei"):
    """Convert text to speech, return audio bytes."""
    try:
        audio = await text_to_speech(text, voice_id)
        return Response(content=audio, media_type="audio/mpeg")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
