from datetime import datetime

def log_query(question, answer, lang):
    with open("query_logs.txt", "a", encoding="utf-8") as f:
        f.write(f"[{datetime.now()}] ({lang}) Q: {question} -> A: {answer}\n")

def log_error(message):
    with open("error_logs.txt", "a", encoding="utf-8") as f:
        f.write(f"[{datetime.now()}] ERROR: {message}\n")
