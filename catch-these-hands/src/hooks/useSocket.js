import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState({ message: undefined, error: undefined });
  const [password, setPassword] = useState('');

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

  useEffect(() => {
     setPassword(window.localStorage.getItem('password'));
  }, []);

  const sendCommand = ({ name, lifecycle }) => {
    console.log('password ', password);
    console.log(window.localStorage.getItem('password'))
    console.log({ command: { name, lifecycle } });
    if(window.localStorage.getItem('password')) {
      const password = window.localStorage.getItem('password');
      console.log('emiting password ', password)
      socket.emit('command', {password: window.localStorage.getItem('password'), msg: {name, lifecycle}})
    } else { 
      socket.emit('command', { name, lifecycle });
    }
  };

  return { sendCommand, isConnected, error };
};

export { useSocket };
