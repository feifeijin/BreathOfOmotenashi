from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from core.config import settings
from core.zilliz_client import ensure_collection_exists
from routes import chat, agora, knowledge


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: ensure Zilliz collection exists
    try:
        ensure_collection_exists()
    except Exception as e:
        print(f"⚠️  Zilliz init skipped: {e}")
    yield
    # Shutdown


app = FastAPI(
    title=settings.APP_NAME,
    description="AI-powered Omotenashi experience platform",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router,      prefix="/api")
app.include_router(agora.router,     prefix="/api")
app.include_router(knowledge.router, prefix="/api")


@app.get("/")
def health():
    return {"status": "ok", "app": settings.APP_NAME}
