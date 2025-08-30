import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser } = useChatStore();
  const { logout, onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="flex flex-col h-full min-w-64 max-w-full flex-shrink-0 bg-white shadow-md p-4">
      <div className="flex flex-col flex-grow">
        <h2 className="text-center text-2xl font-semibold text-[#ff6772] mb-6 border-b pb-4">
          Users
        </h2>

        <div className="flex-grow overflow-y-auto max-h-[calc(100vh-180px)] space-y-2">
          {users.length === 0 ? (
            <p className="text-gray-400">No users found</p>
          ) : (
            users.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full px-6 py-3 rounded-full flex items-center transition ${
                  selectedUser?._id === user._id
                    ? "bg-[#ff6772] text-white"
                    : "hover:bg-pink-100 text-gray-800"
                }`}
              >
                {/* User icon (left-aligned) */}
                <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center text-sm font-bold text-white relative">
                  {user.fullname.charAt(0).toUpperCase()}

                  {/* Online dot in top-right corner of icon */}
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                  )}
                </div>

                {/* Name (centered in remaining space) */}
                <div className="flex-1 flex justify-center items-center space-x-2">
                  <span className="font-medium">{user.fullname}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <button
          onClick={logout}
          className="w-full px-6 py-3 border border-[#ff6772] rounded-full text-[#ff6772] font-medium hover:bg-[#ffe6e9] transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
