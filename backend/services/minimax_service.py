"""MiniMax API service — chat, TTS, embeddings."""
import httpx
from ..core.config import settings

BASE_URL = "https://api.minimax.chat/v1"


async def chat_completion(messages: list[dict], model: str = "abab6.5s-chat") -> str:
    """Send messages to MiniMax LLM, return assistant reply."""
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{BASE_URL}/text/chatcompletion_v2",
            headers={
                "Authorization": f"Bearer {settings.MINIMAX_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": model,
                "messages": messages,
                "max_tokens": 1024,
                "temperature": 0.7,
            },
            timeout=30,
        )
        resp.raise_for_status()
        data = resp.json()
        return data["choices"][0]["message"]["content"]


async def text_to_speech(text: str, voice_id: str = "female-tianmei") -> bytes:
    """Convert text to speech, return audio bytes (MP3)."""
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{BASE_URL}/tts/stream",
            headers={
                "Authorization": f"Bearer {settings.MINIMAX_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "speech-01-turbo",
                "text": text,
                "voice_setting": {
                    "voice_id": voice_id,
                    "speed": 1.0,
                    "vol": 1.0,
                    "pitch": 0,
                },
                "audio_setting": {"format": "mp3", "sample_rate": 32000},
            },
            timeout=30,
        )
        resp.raise_for_status()
        return resp.content


async def get_embedding(text: str) -> list[float]:
    """Get text embedding vector from MiniMax."""
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{BASE_URL}/embeddings",
            headers={
                "Authorization": f"Bearer {settings.MINIMAX_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "embo-01",
                "texts": [text],
                "type": "query",
            },
            timeout=15,
        )
        resp.raise_for_status()
        return resp.json()["vectors"][0]["embedding"]
