import { io } from "socket.io-client";

let socket = null;

export const initializeSocketConnection = () => {
  // Agar socket already connected hai,
  // to naya connection create mat karo
  if (socket) {
    return socket;
  }

  socket = io("http://localhost:3000", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Connected to Socket.IO server");
  });

  return socket;
};
