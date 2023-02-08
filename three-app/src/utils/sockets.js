import { io } from "socket.io-client";
const BACKEND_URL = import.meta.env.PROD ? import.meta.env.VITE_PROD_BACKEND_URL : import.meta.env.VITE_LOCAL_BACKEND_URL ;

let socket;

export const onConnect = () => {
  socket.on('connect', () => {
    console.log('Socket Connected ...');
  });
};

export const onDisconnect = () => {
  socket.on('disconnect', () => {
    console.log('Socket Disconnected ... ...');
  });
};

export const initiateSocketConnection = () => {
  console.log(`Connecting socket...`);
  socket = io(BACKEND_URL);
};

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};

export const onMessageHandler = (setAction) => {
  socket.on('message', ({ name, lifecycle }) => {
    setAction({ name, lifecycle });
  });
};

export const emitTime = (time) => {
  socket.emit('time', time);
};

export const onTime = (setTime) => {
  socket.on('time', (time) => {
    setTime(time);
  });
};
