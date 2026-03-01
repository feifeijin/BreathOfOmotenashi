# Backend

FastAPI backend for BreathOfOmotenashi.

## Requirements

- **Python 3.12** (3.13+ / 3.14 not supported due to dependency compatibility)
- macOS / Linux

## Quick Start

All commands run from **project root** (`BreathOfOmotenashi/`):

```bash
# 1. Install Python 3.12 (macOS)
brew install python@3.12

# 2. Create virtual environment
/opt/homebrew/bin/python3.12 -m venv backend/venv

# 3. Activate virtual environment
source backend/venv/bin/activate

# 4. Install dependencies
pip install -r backend/requirements.txt

# 5. Copy env file and fill in your keys
cp backend/.env.example backend/.env

# 6. Start dev server
python -m uvicorn backend.main:app --reload
```

Server runs at http://127.0.0.1:8000

## Notes

- All commands run from **project root**, not `backend/`
- Always activate venv before running: `source backend/venv/bin/activate`
- `venv/` is git-ignored, each developer needs to create their own
