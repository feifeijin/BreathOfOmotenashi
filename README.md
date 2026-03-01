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

## TEN Agent — リアルタイム音声神社ガイド

TEN Framework を使ったリアルタイム音声パイプラインです。ユーザーが神社カードの「音声ガイドを開始する」を押すと、AIが神秘的なゼルダ風の声で神社を案内します。

### 音声パイプライン

```
ユーザー音声
  → Agora RTC (入力)
  → TEN VAD (発話検出)
  → MiniMax ASR (音声→テキスト)
  → shrine_rag Extension (Zilliz 知識検索)
  → MiniMax LLM (ゼルダ風ナレーション生成)
  → MiniMax TTS (テキスト→音声)
  → Agora RTC (出力)
```

### 起動方法

```bash
cd ten_agent
cp .env.example .env   # fill in API keys
docker-compose up --build
# TEN Agent → http://localhost:8080
```

### TEN Agent 環境変数 (`ten_agent/.env`)

```
AGORA_APP_ID=
AGORA_APP_CERTIFICATE=
MINIMAX_API_KEY=
MINIMAX_GROUP_ID=
ZILLIZ_URI=
ZILLIZ_TOKEN=
AGENT_SERVER_PORT=8080
```

### 新規 API エンドポイント

| Method | Path | Description |
|---|---|---|
| POST | `/api/agora/start-agent` | TEN Agent を起動してチャンネルに参加 |
| POST | `/api/agora/stop-agent` | TEN Agent セッションを停止 |

## Architecture

```
User → Next.js Frontend
         ↓
    FastAPI Backend
    ├── MiniMax (LLM + TTS + Embeddings)
    ├── Zilliz (Vector Search / RAG)
    ├── Agora (RTC Token + Agent control)
    ├── Supabase (Auth + Database)
    └── TEN Agent (Real-time voice pipeline)
              ├── ten_vad
              ├── minimax_asr
              ├── shrine_rag (custom)
              ├── minimax_llm
              └── minimax_tts
```
