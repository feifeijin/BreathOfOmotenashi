"""Knowledge service — RAG chat using MiniMax LLM."""
from .minimax_service import chat_completion


async def rag_chat(user_message: str, history: list[dict] = []) -> str:
    """
    Chat pipeline:
    1. Build system prompt with Omotenashi context
    2. Call MiniMax LLM
    """
    system_prompt = """あなたは「BreathOfOmotenashi」のAIアシスタントです。
日本のおもてなし文化を体現し、丁寧・親切・温かみのある対応をします。
京都の神社仏閣（伏見稲荷大社、嵐山、金閣寺、清水寺、平安神宮など）に詳しく、
訪日外国人の方に日本文化の魅力を伝えることが得意です。
おもてなしの心で最善を尽くして回答してください。"""

    messages = [{"role": "system", "content": system_prompt}]
    messages.extend(history[-10:])
    messages.append({"role": "user", "content": user_message})

    return await chat_completion(messages)
