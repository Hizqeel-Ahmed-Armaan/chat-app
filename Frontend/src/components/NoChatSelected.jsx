import React from 'react';

const NoChatSelected = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-xl ">
        <h2 className="text-3xl font-semibold text-[#ff6772] mb-2">
          No Chat Selected
        </h2>
        <p className="text-gray-500">
          Please select a user to start chatting.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;

