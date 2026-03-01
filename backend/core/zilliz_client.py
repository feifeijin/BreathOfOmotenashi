from pymilvus import MilvusClient
from .config import settings

_client: MilvusClient | None = None


def get_zilliz() -> MilvusClient:
    global _client
    if _client is None:
        _client = MilvusClient(
            uri=settings.ZILLIZ_URI,
            token=settings.ZILLIZ_TOKEN,
        )
    return _client


def ensure_collection_exists():
    """Create collection if not exists — call at startup."""
    client = get_zilliz()
    if client.has_collection(settings.ZILLIZ_COLLECTION):
        return
    client.create_collection(
        collection_name=settings.ZILLIZ_COLLECTION,
        dimension=1536,  # MiniMax embedding dimension
        metric_type="COSINE",
        auto_id=True,
    )
    print(f"✅ Zilliz collection '{settings.ZILLIZ_COLLECTION}' created")
