import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: [
      process.env.THREE_APP_URL,
      process.env.HANDS_APP_URL,
      'http://localhost:5000',
      'http://localhost:5173'
    ],
    methods: ['GET', 'POST'],
  },
});

const directions = [
  'up',
  'down',
  'left',
  'right',
  'forwards',
  'backwards',
  'stop',
];
app.get('/', (req, res) => {
  res.send(`no direction, follow path /move/ + ${directions}`);
});

io.on('connection', (socket) => {
  socket.on('command', (msg) => {
    console.log('Message Received From: ', 'Hand Gesture App ', msg);
    const { name, lifecycle } = msg;
    io.emit('message', { name, lifecycle });
  });
});

httpServer.listen(process.env.PORT || '3000', () => {
  console.log('listening on *:3000');
});
