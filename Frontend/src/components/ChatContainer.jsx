import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import NoChatSelected from "./NoChatSelected.jsx";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const messagesEndRef = useRef(null);

  // Fetch messages and subscribe when selectedUser changes
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();

      return () => unsubscribeFromMessages();
    }
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Show NoChatSelected when no user selected
  if (!selectedUser) return <NoChatSelected />;

  return (
    <div className="flex flex-col h-full bg-gray-200">
      <ChatHeader />

      <div className="flex-grow overflow-y-auto p-4 flex flex-col w-full">
        {messages.map((message) => {
          const isMyMessage =
            message.senderId?.toString() === authUser?._id?.toString();

          return (
            <div
              key={message._id}
              className={`max-w-xs px-4 py-2 my-1 rounded-xl break-words ${
                isMyMessage
                  ? "ml-auto bg-[#ff6772]/80 text-white"
                  : "mr-auto bg-gray-300 text-gray-900"
              }`}
            >
              {message.text}
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="sticky bottom-0 p-4 bg-gray-200">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
