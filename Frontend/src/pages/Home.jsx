import React from "react";
import { useChatStore } from "../store/useChatStore.js";
import Sidebar from "../components/Sidebar.jsx";
import NoChatSelected from "../components/NoChatSelected.jsx";
import ChatContainer from "../components/ChatContainer.jsx";

const Home = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  return (
    <div className="h-screen flex">

      <div className="hidden md:flex w-full">
        <div className="w-1/4 md:w-1/3">
          <Sidebar />
        </div>
        <div className="w-3/4 md:w-2/3">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>


      <div className="flex md:hidden w-full">
        {!selectedUser ? (
   
          <div className="w-full">
            <Sidebar />
          </div>
        ) : (
        
          <div className="w-full relative">
            
            <ChatContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

