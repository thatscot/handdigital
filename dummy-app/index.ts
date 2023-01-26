import express from 'express';

const app = express();

app.get('/receive/:direction', (req, res) => {

    const direction = req.params.direction;
    const message = `${direction} received by drone app`
    console.log(message)
    res.send({ message });
})

app.listen(3001, () => {
    console.log('listening on port 3001');
})
