import httpx
from schemas.session import FilterProductsTool

tools_payload = [FilterProductsTool().dict()]
async def create_realtime_session(api_key: str):
    url = "https://api.openai.com/v1/realtime/sessions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "gpt-4o-realtime-preview-2024-12-17",
        "modalities": ["text"],
        "input_audio_transcription": {
            "model": "whisper-1"
        },
        "tools": tools_payload
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()