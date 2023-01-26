import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const httpServer2 = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const io2 = new Server(httpServer2, {
  cors: {
    origin: 'http://localhost:5000',
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

// app.get('/', (req, res) => {
//   res.send(`no direction, follow path /move/ + ${directions}`);
// })

// app.get('/move/:direction', (req, res) => {

//   const direction = req.params.direction;

//   if (direction && directions.includes(direction)){
    
//     io.emit('action', direction, (response) => {
//       console.log(response);
//       res.send(response);
//     });

//   }
//   else{
//     res.send('no valid direction added');
//   }
// })

io2.on('command', (command) => {
  console.log('command: ', command);
  if (command && directions.includes(command)){
    
    io.emit('action', command, (response) => {
      console.log(response);
    });

  }
  else{
    console.log('no valid command');
  }
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});

// httpServer2.listen(3001, () => {
//   console.log('server 2 listening on *:3001');
// });