import logging
from typing import Any, Dict, List

from django.conf import settings

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = (
    "You are BESPEAK, a premium fashion stylist assistant for a high-end marketplace. "
    "Reply in the same language as the user. Be concise, elegant, and editorial in tone. "
    "When suggesting looks, mention silhouette, palette, and occasion in one or two short sentences."
)


def run_chat_completion(message: str, history: List[Dict[str, Any]]) -> str:
    from openai import OpenAI

    if not settings.OPENAI_API_KEY:
        raise RuntimeError("OPENAI_API_KEY is not configured")

    client = OpenAI(api_key=settings.OPENAI_API_KEY)
    model = settings.OPENAI_MODEL

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for item in history:
        role = item.get("role")
        content = item.get("content", "")
        if role in ("user", "assistant") and content:
            messages.append({"role": role, "content": content})
    messages.append({"role": "user", "content": message})

    try:
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            max_tokens=500,
        )
    except Exception as exc:
        logger.exception("OpenAI API error")
        raise RuntimeError("OpenAI request failed") from exc

    choice = response.choices[0] if response.choices else None
    if not choice or not choice.message or not choice.message.content:
        raise RuntimeError("Empty response from OpenAI")
    return choice.message.content.strip()
