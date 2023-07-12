import express from 'express'
const http = require('http');

const app = express()
const server = http.createServer(app);

import { Server } from 'socket.io';
const io = new Server(server);

const port = 3001

app.get('/', (req, res) => {
    res.send('2')
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    }) 
});

server.listen(port, () => {
    console.log(`Hello world ${port}`)
})
