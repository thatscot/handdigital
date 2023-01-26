import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  },
});

const directions = [
  "up",
  "down",
  "left",
  "right",
  "forwards",
  "backwards",
  "stop",
];

app.get("/", (req, res) => {
  // io.emit('message', 'sending empty direction', (response) => {
  //   console.log(response);
  // });

  res.send(`no direction, follow path /move/ + ${directions}`);
});

app.get("/move/:direction", (req, res) => {
  const direction = req.params.direction;

  if (direction && directions.includes(direction)) {
    io.emit("message", direction, (response) => {
      console.log(response);
      res.send(response);
    });
  } else {
    res.send("no valid direction added");
  }
});

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.emit('message', 'hello world', (response) => {
//     console.log(response);
//   });
// });

io.on("connection", (socket) => {
  socket.on("command", (msg) => {
    console.log(msg);
  });
});

httpServer.listen(3000, () => {
  console.log("listening on *:3000");
});
