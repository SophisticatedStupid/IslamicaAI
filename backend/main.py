from fastapi import FastAPI, Request
from pydantic import BaseModel
from app_logic import ask_ai

app = FastAPI()

class ChatRequest(BaseModel):
    message: str
    chat_history: list
    language: str = "English"
    tts_enabled: bool = False

@app.get("/")
def root():
    return {"message": "IslamicaAI backend is running. Use /chat or /health."}

@app.post("/chat")
def chat_endpoint(req: ChatRequest):
    _, new_history = ask_ai(
        req.message,
        req.chat_history,
        req.language,
        req.tts_enabled
    )
    return {"history": new_history}

@app.get("/health")
def health():
    return {"status": "ok"}
