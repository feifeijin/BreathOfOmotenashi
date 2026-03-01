from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..services.knowledge_service import upsert_knowledge, search_knowledge

router = APIRouter(prefix="/knowledge", tags=["knowledge"])


class UpsertRequest(BaseModel):
    doc_id: str
    text: str
    metadata: dict = {}


class SearchRequest(BaseModel):
    query: str
    top_k: int = 5


@router.post("/upsert")
async def upsert(req: UpsertRequest):
    """Add or update a knowledge entry in the vector store."""
    try:
        await upsert_knowledge(req.doc_id, req.text, req.metadata)
        return {"status": "ok", "doc_id": req.doc_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/search")
async def search(req: SearchRequest):
    """Semantic search over the knowledge base."""
    try:
        results = await search_knowledge(req.query, req.top_k)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
