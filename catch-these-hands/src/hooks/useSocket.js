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
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const sendCommand = ({ name, lifecycle }) => {
    console.log({ command: { name, lifecycle } });
    socket.emit('command', { name, lifecycle });
  };

  return { sendCommand, isConnected, error };
};

export { useSocket };
