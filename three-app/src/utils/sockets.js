import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

let socket;

export const onConnect = () => {
  socket.on("connect", () => {
    console.log("Socket Connected ...");
  });
};

export const onDisconnect = () => {
  socket.on("disconnect", () => {
    console.log("Socket Disconnected ... ...");
  });
};

export const initiateSocketConnection = () => {
  console.log(`Connecting socket...`);

  const uuid = uuidv4();

  console.log(uuid, 'uuid');
  
  socket = io(BACKEND_URL);
  socket.auth = { uuid };
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const onMessageHandler = (setAction) => {
  socket.on("message", ({ name, lifecycle }) => {
    setAction({ name, lifecycle });
  });
};
