# 🌸 Breath of Omotenashi

> AIが体現する、日本のおもてなし体験プラットフォーム

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 15 + TypeScript + Tailwind |
| Backend | Python FastAPI |
| Database | Supabase (PostgreSQL) |
| AI Chat/TTS | MiniMax |
| Real-time A/V | Agora RTC |
| Vector Search | Zilliz Cloud |

## Quick Start

### 1. Clone & Setup
```bash
git clone https://github.com/feifeijin/BreathOfOmotenashi.git
cd BreathOfOmotenashi
```

### 2. Backend
```bash
cd backend
cp .env.example .env   # fill in your API keys
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
# → http://localhost:8000
# → http://localhost:8000/docs (Swagger UI)
```

### 3. Frontend
```bash
cd frontend
cp .env.local.example .env.local   # fill in your keys
npm install
npm run dev
# → http://localhost:3000
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/chat` | RAG-powered AI chat |
| POST | `/api/chat/tts` | Text-to-speech |
| POST | `/api/agora/token` | Generate Agora RTC token |
| POST | `/api/knowledge/upsert` | Add to knowledge base |
| POST | `/api/knowledge/search` | Semantic search |

## Environment Variables

### Backend `.env`
```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
MINIMAX_API_KEY=
MINIMAX_GROUP_ID=
AGORA_APP_ID=
AGORA_APP_CERTIFICATE=
ZILLIZ_URI=
ZILLIZ_TOKEN=
```

### Frontend `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_AGORA_APP_ID=
```

## Architecture

```
User → Next.js Frontend
         ↓
    FastAPI Backend
    ├── MiniMax (LLM + TTS + Embeddings)
    ├── Zilliz (Vector Search / RAG)
    ├── Agora (RTC Token)
    └── Supabase (Auth + Database)
```
