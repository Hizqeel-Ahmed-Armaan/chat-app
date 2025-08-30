import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

// Map to keep track of connected users and their sockets
const userSocketMap = {};

// Function to get a socket by userId (optional utility)
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected");

  // Get userId from query
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket; // store actual socket

  // Emit current online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Listen for sending messages
  socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
    // Here you should save the message to your DB, e.g.:
    // const savedMessage = await Message.create({ senderId, receiverId, text });

    const message = {
      _id: Date.now().toString(), // temporary ID, replace with DB ID if using DB
      senderId,
      receiverId,
      text,
    };

    // Emit message to receiver if online
    const receiverSocket = userSocketMap[receiverId];
    if (receiverSocket) {
      receiverSocket.emit("newMessage", message);
    }

    // Emit message back to sender so their frontend also updates
    socket.emit("newMessage", message);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
