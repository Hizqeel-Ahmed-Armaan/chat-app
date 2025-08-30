import React, { useState } from "react";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();

  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      await sendMessage(text);
      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-2 bg-white">
      <div className="flex items-center gap-2 w-full px-2 py-2 bg-gray-100 rounded-full shadow-md">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 min-w-0 px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff6772] focus:border-[#ff6772] transition"
        />
        <button
          onClick={handleSend}
          className="shrink-0 px-4 py-2 border border-[#ff6772] rounded-full text-[#ff6772] font-medium hover:bg-[#ffe6e9] transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;



