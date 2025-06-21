export default function Header() {
  return (
    <div className="w-full max-w-3xl bg-[#23272f] p-4 rounded-xl mb-4 shadow">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        🕌 IslamicaAI – Your Islamic Advisor
      </h1>
      <div className="text-sm mt-2">Developer: Khan Tahsin Abrar</div>
      <div className="text-sm">
        Contact: <a href="mailto:khan.tahsin.abrar.kta@gmail.com" className="underline text-green-400">khan.tahsin.abrar.kta@gmail.com</a>
      </div>
      <div className="flex flex-wrap gap-3 mt-2">
        <a href="https://github.com/SophisticatedStupid" target="_blank" rel="noreferrer">🌐 GitHub</a>
        <a href="https://instagram.com/khan_tahsin_ehan_abrar?igsh=YzljYTk1ODg3Zg==" target="_blank" rel="noreferrer">📱 Instagram</a>
        <a href="https://linkedin.com/in/khantahsinabrar" target="_blank" rel="noreferrer">💼 LinkedIn</a>
        <a href="https://www.freelancer.com/u/ktaxo?sb=t" target="_blank" rel="noreferrer">🐦 Freelancer</a>
        <a href="https://dribbble.com/khanTEAX" target="_blank" rel="noreferrer">🏀 Dribbble</a>
        <a href="https://facebook.com/khan.tahsinabrar" target="_blank" rel="noreferrer">📘 Facebook</a>
      </div>
      <div className="text-xs text-gray-400 mt-2">Version 1.3.0 (v2) • Last Updated: 16th May, 2025</div>
    </div>
  );
}
