# Backend

FastAPI backend for BreathOfOmotenashi.

## Requirements

- **Python 3.12** (3.13+ / 3.14 not supported due to dependency compatibility)
- macOS / Linux

## Quick Start

```bash
# 1. Install Python 3.12 (macOS)
brew install python@3.12

# 2. Create virtual environment
/opt/homebrew/bin/python3.12 -m venv venv

# 3. Activate virtual environment
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Copy env file and fill in your keys
cp .env.example .env

# 6. Start dev server (run from project root)
cd ..
python -m uvicorn backend.main:app --reload
```

Server runs at http://127.0.0.1:8000

## Notes

- Always activate venv before running: `source venv/bin/activate`
- Must start uvicorn from **project root** (not `backend/`), because `main.py` uses relative imports
- `venv/` is git-ignored, each developer needs to create their own
