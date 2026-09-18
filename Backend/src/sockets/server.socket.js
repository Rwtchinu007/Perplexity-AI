import { Server } from "socket.io";
let io; //io k andr socket.io ka instance store hoga, taki hum use baad me access kar sake.
export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  console.log("Socket.io server is RUNNING");

  io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id); // it means that a user has connected to the socket server and we are logging the socket id of that user.
  });
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}
