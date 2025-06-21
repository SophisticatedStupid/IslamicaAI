import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("English");
  const [tts, setTts] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");

    try {
      const res = await axios.post("/chat", {
        message: input,
        chat_history: messages.filter(m => m.role === "user" || m.role === "assistant").map(m => [m.content, m.content]),
        language,
        tts_enabled: tts,
      });
      const reply = res.data.history?.[res.data.history.length - 1]?.[1] || "No response.";
      setMessages((msgs) => [...msgs, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { role: "assistant", content: "Error: " + err.message }]);
    }
  }

  return (
    <div className="w-full max-w-3xl bg-[#202123] p-4 rounded-xl flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto space-y-4 mb-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                m.role === "user"
                  ? "bg-green-700 text-right"
                  : "bg-gray-800 text-left"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex gap-2 mt-2">
        <input
          className="flex-1 rounded-lg px-3 py-2 bg-[#252d3a] text-white border border-[#393c48] focus:outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your question…"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-bold"
        >
          Send
        </button>
      </form>
      <div className="flex items-center gap-4 mt-3">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={tts}
            onChange={e => setTts(e.target.checked)}
          />
          <span className="text-xs">Enable Voice Output (TTS)</span>
        </label>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="ml-4 px-2 py-1 bg-[#252d3a] rounded text-white text-xs"
        >
          <option>English</option>
          <option>Arabic</option>
          <option>Bangla</option>
          <option>French</option>
          <option>Spanish</option>
          <option>Chinese</option>
          <option>Indonesian</option>
          <option>Russian</option>
          <option>Swedish</option>
          <option>Turkish</option>
          <option>Urdu</option>
        </select>
      </div>
    </div>
  );
}
