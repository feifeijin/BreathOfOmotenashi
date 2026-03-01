from pathlib import Path
from pydantic_settings import BaseSettings

_ENV_FILE = Path(__file__).resolve().parent.parent / ".env"


class Settings(BaseSettings):
    # App
    APP_NAME: str = "BreathOfOmotenashi"
    DEBUG: bool = True

    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""

    # MiniMax
    MINIMAX_API_KEY: str = ""
    MINIMAX_GROUP_ID: str = ""

    # Agora
    AGORA_APP_ID: str = ""
    AGORA_APP_CERTIFICATE: str = ""

    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = str(_ENV_FILE)
        case_sensitive = True


settings = Settings()
