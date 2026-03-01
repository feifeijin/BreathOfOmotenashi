"""MiniMax API service — chat and TTS."""
import httpx
from ..core.config import settings

BASE_URL = "https://api.minimax.io/v1"


def _headers() -> dict:
    return {
        "Authorization": f"Bearer {settings.MINIMAX_API_KEY}",
        "Content-Type": "application/json",
    }


async def chat_completion(messages: list[dict], model: str = "MiniMax-Text-01") -> str:
    """Send messages to MiniMax LLM, return assistant reply."""
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{BASE_URL}/chat/completions",
            headers=_headers(),
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
            f"{BASE_URL}/t2a_v2",
            headers=_headers(),
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
        data = resp.json()
        return bytes.fromhex(data["data"]["audio"])
