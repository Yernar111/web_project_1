# BESPEAK backend (Django)

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Set OPENAI_API_KEY in .env for AI chat
python manage.py migrate
python manage.py seed_demo
python manage.py createsuperuser
python manage.py runserver 8000
```

## API

- `GET http://127.0.0.1:8000/api/products/` — active products with display price.
- `POST http://127.0.0.1:8000/api/chat/` — body: `{"message": "...", "history": [{"role":"user"|"assistant","content":"..."}]}` (history optional). Returns `{"reply":"..."}`. Without `OPENAI_API_KEY`, responds with **503** and a JSON `detail` message.

## Admin

Products and SKUs: `http://127.0.0.1:8000/admin/`
