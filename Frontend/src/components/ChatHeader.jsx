import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  return (
    <div className="flex items-center bg-gray-200 p-4 rounded-2xl">
      {/* Back button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="px-4 py-2 border border-[#ff6772] rounded-full text-[#ff6772] font-medium hover:bg-[#ffe6e9] transition"
      >
        ← Back
      </button>

      {/* Center: User icon + name */}
      <div className="flex-1 flex items-center justify-center space-x-3">
        <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center text-sm font-bold text-white relative">
          {selectedUser.fullname.charAt(0).toUpperCase()}

          {/* Green online dot */}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
          )}
        </div>

        <span className="text-xl font-semibold text-gray-800">
          {selectedUser.fullname}
        </span>
      </div>

      {/* Right placeholder for balance */}
      <div className="px-4 py-2 invisible">
        ← Back
      </div>
    </div>
  );
};

export default ChatHeader;

