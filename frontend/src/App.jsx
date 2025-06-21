import React from "react";
import Header from "./components/header";
import NoticeBoard from "./components/NoticeBoard";
import ChatBox from "./components/chatbox";
import Sidebar from "./components/Sidebar";
import Footer from "./components/footer";

export default function App() {
  return (
    <div className="flex h-screen bg-[#181a20] text-white">
      {/* Sidebar for future features */}
      <Sidebar />
      <main className="flex-1 flex flex-col items-center p-4 overflow-y-auto">
        <Header />
        <NoticeBoard />
        <ChatBox />
        <Footer />
      </main>
    </div>
  );
}
