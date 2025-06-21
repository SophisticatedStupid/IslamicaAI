import os
from gtts import gTTS
import requests
from datetime import datetime
from logger import log_query, log_error

HF_KEY = os.environ.get("HFAPI")

tts_language_map = {
    "English": "en",
    "Arabic": "ar",
    "Bangla": "bn",
    "French": "fr",
    "Spanish": "es",
    "Chinese": "zh-CN",
    "Indonesian": "id",
    "Russian": "ru",
    "Swedish": "sv",
    "Turkish": "tr",
    "Urdu": "ur"
}

common_responses = {
    "assalamualaikum": {
        "English": "Wa'alaikumussalam Warahmatullahi Wabarakatuh (Peace, mercy and blessings of Allah be upon you too).",
        "Arabic": "وعليكم السلام ورحمة الله وبركاته",
        "Bangla": "ওয়ালাইকুমুস সালাম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহু",
        "French": "Wa'alaikumussalam Warahmatullahi Wabarakatuh (Que la paix, la miséricorde et les bénédictions d'Allah soient également sur vous).",
        "Spanish": "Wa'alaikumussalam Warahmatullahi Wabarakatuh (La paz, misericordia y bendiciones de Allah sean contigo también).",
        "Chinese": "瓦阿莱库姆萨拉姆 瓦拉赫玛图拉希 瓦巴拉卡图胡 (愿安拉的平安、仁慈和祝福也降临你)",
        "Indonesian": "Wa'alaikumussalam Warahmatullahi Wabarakatuh (Semoga kedamaian, rahmat dan berkah Allah juga menyertaimu).",
        "Russian": "Ва'алейкум ассалам варахматуллахи вабаракатух (Мир, милость и благословение Аллаха также с вами).",
        "Swedish": "Wa'alaikumussalam Warahmatullahi Wabarakatuh (Må Allahs fred, barmhärtighet och välsignelser vara med dig också).",
        "Turkish": "Ve aleyküm selam ve rahmetullahi ve berekatüh (Allah'ın selamı, rahmeti ve bereketi sizin de üzerinize olsun).",
        "Urdu": "وعلیکم السلام ورحمۃ اللہ وبرکاتہ"
    }
}

SYSTEM_PROMPT = """You are IslamicaAI, a trusted and humble Islamic advisor and assistant. Always answer with references from the Quran, Sahih Hadith, and scholarly consensus (if applicable) and Islamic lifestyle. When unsure, say 'I don't know' or 'Consult a real scholar'. Be concise, respectful, and honest.  Your developper is Khan Tahsin Abrar, he needs money to support pious islamicaai project."""

MODELS = {
    "primary": "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta"
    # Add more model endpoints here if needed
}

def ask_ai(message, chat_history, language="English", tts_enabled=False):
    if not message or not message.strip():
        return "", chat_history

    message_lower = message.lower().replace(" ", "")
    greeting_variations = [
        "assalamualaikum", "asalamualaikum", "assalamu'alaikum", "asalamu'alaikum",
        "assalamoalaikum", "asalamoalaikum", "salam", "salaam"
    ]
    # Greeting shortcut
    for greeting in greeting_variations:
        if greeting in message_lower:
            response = common_responses["assalamualaikum"].get(
                language, common_responses["assalamualaikum"]["English"]
            )
            chat_history.append((message, response))
            if tts_enabled:
                try:
                    tts_lang = tts_language_map.get(language, "en")
                    tts = gTTS(response, lang=tts_lang)
                    tts.save("answer.mp3")
                except Exception as e:
                    log_error(f"TTS Error: {str(e)}")
            return "", chat_history

    if HF_KEY:
        response = ask_huggingface(message, language, tts_enabled)
        chat_history.append((message, response))
        return "", chat_history
    else:
        response = "No valid HuggingFace API key provided. Please check the application configuration."
        chat_history.append((message, response))
        return "", chat_history

def ask_huggingface(question, language, tts_enabled):
    prompt = f"{SYSTEM_PROMPT}\n\nUser: {question}"
    headers = {
        "Authorization": f"Bearer {HF_KEY}",
        "Content-Type": "application/json"
    }

    for model_name, model_url in MODELS.items():
        try:
            payload = {
                "inputs": prompt,
                "parameters": {
                    "max_new_tokens": 700,
                    "temperature": 0.7,
                    "top_p": 0.9
                }
            }
            response = requests.post(model_url, headers=headers, json=payload, timeout=30)
            if response.status_code in [401, 404, 503]:
                log_error(f"{response.status_code} Error: {model_url}")
                continue

            response.raise_for_status()
            result = response.json()
            answer = ""
            if isinstance(result, list) and "generated_text" in result[0]:
                answer = result[0]["generated_text"]
            elif isinstance(result, dict) and "generated_text" in result:
                answer = result["generated_text"]
            else:
                answer = str(result)

            # Strip prompt or other artifacts
            if "[/INST]" in answer:
                answer = answer.split("[/INST]")[1].strip()
            if SYSTEM_PROMPT in answer:
                answer = answer.replace(SYSTEM_PROMPT, "").strip()
            user_prefix = f"User: {question}"
            if user_prefix in answer:
                answer = answer.replace(user_prefix, "").strip()

            log_query(question, answer, language)

            if tts_enabled:
                try:
                    tts_lang = tts_language_map.get(language, "en")
                    tts = gTTS(answer, lang=tts_lang)
                    tts.save("answer.mp3")
                except Exception as e:
                    log_error(f"TTS Error: {str(e)}")
            return answer
        except Exception as e:
            log_error(f"Error with {model_name}: {e}")
            continue

    return "I'm sorry, all AI models are currently unavailable. Please try again later."
