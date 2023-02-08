import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const httpServer = createServer(app);

const options = {
  cors: {
    origin: [
      process.env.THREE_APP_URL,
      process.env.HANDS_APP_URL,
      'http://localhost:5000',
      'http://localhost:5173'
    ],
    methods: ['GET', 'POST'],
  },
};

const io = new Server(httpServer, options);

const sessions = {};

io.on('connection', (socket) => {

  const uuid = socket.handshake.auth.uuid;

  if (uuid) sessions[uuid] = { sessionId: socket.id };

  socket.on('command', ({ command, uuid }) => {

    console.log(command, uuid);

    const { name, lifecycle } = command;

    const sessionId = sessions[uuid]?.sessionId;

    if (!sessionId) console.log(`No Session found using sessionId: ${sessionId}`);

    if (sessionId) io.to(sessionId).emit('message', { name, lifecycle });
  });
});

httpServer.listen(process.env.PORT || '3000', () => {
  console.log('listening on *:3000');
});
