import { io } from 'socket.io-client';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

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

export const emitPosition = (position) => {
  console.log('emit');
  socket.on('position', position);
};

export const onPrivateMessage = (password, setAction) => {
  console.log('listening for ', `message:${password}`);
  socket.on(`message:${password}`, ({ name, lifecycle }) => {
    console.log('p message ', name, lifecycle);
    setAction({ name, lifecycle });
  });
};
