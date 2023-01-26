import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const directions = [
  'up',
  'down',
  'strafeleft',
  'straferight',
  'turnleft',
  'turnright',
  'forwards',
  'backwards',
  'stop',
];

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('message', 'hello world', (response) => {
    console.log(response);
  });
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});
