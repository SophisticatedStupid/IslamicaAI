export default function NoticeBoard() {
  return (
    <div className="w-full max-w-3xl bg-[#252d3a] p-3 rounded-xl mb-4">
      <details open>
        <summary className="font-semibold">📢 Notice Board</summary>
        <ul className="text-sm mt-2 list-disc ml-4">
          <li><b>AI MODEL IS WORKING NOW!</b></li>
          <li><b>Updated:</b> Now with support for 11 languages!</li>
          <li><b>Languages Available:</b> English, Arabic, Bangla, French, Spanish, Chinese, Indonesian, Russian, Swedish, Turkish, Urdu</li>
          <li><b>New Feature:</b> Text-to-speech is available!</li>
          <li><b>New Interface:</b> Chat-style interface for better conversation flow</li>
        </ul>
      </details>
    </div>
  );
}
