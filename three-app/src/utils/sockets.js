import { io } from 'socket.io-client';

let socket;

if (socket) {

    socket.on('connect', (setIsConnected) => {
        console.log('Socket Connected ...');
        setIsConnected(true);
    });

    socket.on('disconnect', () => {
        console.log('Socket Disconnected ... ...');
        setIsConnected(false);
    });
};

export const initiateSocketConnection = () => {
    console.log(`Connecting socket...`);
    socket = io('http://localhost:3000');
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