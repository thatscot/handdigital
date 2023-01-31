import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState({ message: undefined, error: undefined });
  let socket;
  try {
    socket = io("http://localhost:3001");
  } catch (e) {
    setError({ message: "Failed to find socket", error: e });
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected...");
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected...");
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const sendCommand = ({ name, lifecycle }) => {
    console.log({ command: { name, lifecycle } });
    socket.emit("command", { name, lifecycle });
  };

  return { sendCommand, isConnected, error };
};

export { useSocket };
