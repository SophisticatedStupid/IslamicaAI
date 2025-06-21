# IslamicaAI (Docker + FastAPI Edition)

## 🚀 Quick Start

```bash
# Build and run the backend
cd backend
docker build -t islamicaai-backend .
docker run -e HFAPI=your_huggingface_key -p 7860:7860 islamicaai-backend
