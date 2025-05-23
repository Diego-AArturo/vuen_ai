from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.openai import create_realtime_session
from config import OPENAI_API_KEY

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to allowed origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/session", summary="Start a voice session", response_description="OpenAI session response")
async def get_session():
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI API key not set")
    return await create_realtime_session(OPENAI_API_KEY)