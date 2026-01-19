  import { Server } from "socket.io";
  import http from "http";
  import express from "express";

  const app = express();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"], // Your Frontend URL
      credentials: true,
    },
  });

  // Map to store online users: { userId: socketId }
  const userSocketMap = {}; 

  export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
  };

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    // Get userId from the frontend connection request
    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    // Broadcast online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // --- CRITICAL: Join Project Room ---
    socket.on("joinProject", (projectId) => {
      socket.join(projectId);
      console.log(`User ${userId} joined room: ${projectId}`);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  export { io, app, server };