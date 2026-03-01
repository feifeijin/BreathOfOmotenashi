from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import settings
from .routes import chat, agora

app = FastAPI(
    title=settings.APP_NAME,
    description="AI-powered Omotenashi experience platform",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router,  prefix="/api")
app.include_router(agora.router, prefix="/api")


@app.get("/")
def health():
    return {"status": "ok", "app": settings.APP_NAME}
