export default function Sidebar() {
  return (
    <aside className="w-60 bg-[#202123] border-r border-[#23272f] h-full flex flex-col p-4">
      <div className="font-bold text-xl mb-6 text-green-400">IslamicaAI</div>
      <nav className="flex-1 flex flex-col gap-3">
        <button className="text-left p-2 rounded bg-[#23272f] hover:bg-green-800 transition-all">
          🧿 Duaa Tracker
        </button>
        <button className="text-left p-2 rounded bg-[#23272f] hover:bg-green-800 transition-all">
          🧮 Counter
        </button>
        <button className="text-left p-2 rounded bg-[#23272f] hover:bg-green-800 transition-all">
          🗓️ Calendar
        </button>
        <button className="text-left p-2 rounded bg-[#23272f] hover:bg-green-800 transition-all">
          📖 Quran/Hadith
        </button>
        {/* Add more sections as features arrive */}
      </nav>
      <div className="text-xs text-gray-500 mt-8">
        <a href="https://github.com/SophisticatedStupid" className="underline">Source</a>
      </div>
    </aside>
  );
}
