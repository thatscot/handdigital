import { io } from 'socket.io-client';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http:localhost:3000';

let socket;

export const onConnect = (setIsConnected) => {
  socket.on('connect', () => {
    console.log('Socket Connected ...');
    setIsConnected(true);
  });
};

export const onDisconnect = (setIsConnected) => {
  socket.on('disconnect', () => {
    console.log('Socket Disconnected ... ...');
    setIsConnected(false);
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
    console.log({ command: { name, lifecycle } });
    setAction({ name, lifecycle });
  });
};
