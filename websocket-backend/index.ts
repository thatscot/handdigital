import express from 'express';
import http from 'http'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

// const io = new Server(server);

const directions = ["up", "down", "strafeleft", "straferight", "turnleft", "turnright", "forwards", "backwards", "stop"]

app.get('/move/:direction', async (req, res) => {

    const direction:string = req.params.direction;

    if (direction && directions.includes(direction)){
        const response = await sendToDrone(direction);
        res.send(response);
    }
    else{
        res.send('no valid direction added');
    }
    
})

app.get('/', (req, res) => {
    res.send(`follow the path /move/ + ${directions}`);
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})

async function sendToDrone(direction: string) {

    let response = await fetch(`http://localhost:3001/receive/${direction}`)
    const data = await response.json();

    return data;
}