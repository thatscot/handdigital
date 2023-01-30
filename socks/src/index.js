import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const httpServer2 = createServer(app);

//Three App
const io = new Server(httpServer, {
  cors: {
    // origin: "http://localhost:5173",
    origin: process.env.THREE_APP_URL,
    methods: ['GET', 'POST'],
  },
});

// Hand App
const io2 = new Server(httpServer2, {
  cors: {
    // origin: 'http://localhost:5000',
    origin: process.env.HANDS_APP_URL,
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
  // io.emit('message', 'sending empty direction', (response) => {
  //   console.log(response);
  // });
  res.send(`no direction, follow path /move/ + ${directions}`);
});
app.get('/move/:direction', (req, res) => {
  const direction = req.params.direction;
  if (direction && directions.includes(direction)) {
    io.emit('message', direction, (response) => {
      console.log(response);
    });
  } else {
    res.send('no valid direction added');
  }
});

io2.on('connection', (socket) => {
  socket.on('command', (msg) => {
    console.log('Message Received From: ', 'Hand Gesture App ', msg);
    const { name, lifecycle } = msg;
    io.emit('message', { name, lifecycle });
  });
});

// httpServer.listen(3000, () => {
//   console.log('listening on *:3000');
// });
httpServer.listen(process.env.PORT, () => {
  console.log('listening on ', process.env.PORT);
});
httpServer2.listen(3001, () => {
  console.log('server 2 listening on *:3001');
});