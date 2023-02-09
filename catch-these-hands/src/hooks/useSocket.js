import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState({ message: undefined, error: undefined });
  let socket;
  try {
    socket = io(BACKEND_URL);
  } catch (e) {
    setError({ message: 'Failed to find socket', error: e });
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected...');
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      console.log('Disconnected...');
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const sendCommand = ({ name, lifecycle, uuid }) => {
    console.log({ command: { name, lifecycle } });
    socket.emit('command', { command: { name, lifecycle }, uuid });
  };

  return { sendCommand, isConnected, error };
};

export { useSocket };
