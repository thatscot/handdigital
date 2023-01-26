import express from 'express';
import http from 'http'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/receive/:direction', (req, res) => {

    const direction = req.params.direction;
    const message = `${direction} received by drone app`
    console.log(message)
    res.send({ message });
})

app.get('/', (req, res) => {
    console.log("a")
    res.send({ a: "a" });
})

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(3001, () => {
    console.log('listening on port 3001');
})
