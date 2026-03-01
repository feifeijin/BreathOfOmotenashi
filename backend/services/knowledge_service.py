"""Knowledge base service using Zilliz vector store + MiniMax embeddings."""
from ..core.config import settings
from ..core.zilliz_client import get_zilliz
from .minimax_service import get_embedding


async def upsert_knowledge(doc_id: str, text: str, metadata: dict) -> None:
    """Add or update a knowledge entry in Zilliz."""
    vector = await get_embedding(text)
    client = get_zilliz()
    client.upsert(
        collection_name=settings.ZILLIZ_COLLECTION,
        data=[{
            "id": doc_id,
            "vector": vector,
            "text": text,
            "metadata": str(metadata),
        }],
    )


async def search_knowledge(query: str, top_k: int = 5) -> list[dict]:
    """Semantic search over the knowledge base."""
    vector = await get_embedding(query)
    client = get_zilliz()
    results = client.search(
        collection_name=settings.ZILLIZ_COLLECTION,
        data=[vector],
        limit=top_k,
        output_fields=["text", "metadata"],
    )
    return [
        {"text": hit["entity"]["text"], "score": hit["distance"]}
        for hit in results[0]
    ]


async def rag_chat(user_message: str, history: list[dict] = []) -> str:
    """
    RAG pipeline:
    1. Search knowledge base for relevant context
    2. Build prompt with context
    3. Call MiniMax LLM
    """
    from .minimax_service import chat_completion

    # Step 1: Retrieve relevant knowledge
    knowledge_chunks = await search_knowledge(user_message, top_k=3)
    context = "\n\n".join([f"[参考情報]\n{k['text']}" for k in knowledge_chunks])

    # Step 2: Build system prompt
    system_prompt = f"""あなたは「BreathOfOmotenashi」のAIアシスタントです。
日本のおもてなし文化を体現し、丁寧・親切・温かみのある対応をします。
以下の参考情報を活用して回答してください。

{context}

参考情報に答えがない場合は、おもてなしの心で最善を尽くして回答してください。"""

    # Step 3: Build message history
    messages = [{"role": "system", "content": system_prompt}]
    messages.extend(history[-10:])  # keep last 10 messages
    messages.append({"role": "user", "content": user_message})

    return await chat_completion(messages)
