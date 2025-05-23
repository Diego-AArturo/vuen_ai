# 🛍️ Voice E-commerce Agent (Real-time with OpenAI & WebRTC)

This project is a real-time voice-powered E-commerce agent that uses OpenAI's GPT-4o Realtime API and WebRTC to capture voice, transcribe speech, and trigger product filter actions via function calling.

---

## Features

- Real-time voice capture using WebRTC
- Live transcription using OpenAI's `gpt-4o-realtime-preview-2024-12-17`
- Function calling with mock `filter_products` tool
- Interactive frontend with transcription and product filters display
- Microphone volume feedback bar
- Pause/Resume/Reset session controls

---


## Example Flow

Say: “Show me red sneakers under 100 dollars.”

➡️ Live transcript: `Show me red sneakers under 100 dollars.`
➡️ Function call: `filter_products(category='sneakers', color='red', max_price=100)`
➡️ UI result shows the filtered values.

---

## Backend Setup

1. Create `.env` with your OpenAI API key:

OPENAI_API_KEY=your-api-key-here

2. Install dependencies:

```bash
pip install -r requirements.txt

Run the FastAPI server:
uvicorn main:app --reload

Frontend Setup
Install dependencies:
npm install

Start the React development server:
npm run dev

🌐 Usage
Click Start to initialize voice recognition.

Speak your query.

View the live transcription and filter results below.

```
