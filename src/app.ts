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
    socket.emit('message', 'Welcome to chat!')
    io.emit('message', 'Someone has joined the chat')

    socket.on('disconnect', () => {
        io.emit('message', 'Someone has left the chat')
    }) 

    socket.on('chatMsg', (msg) => {
        io.emit('message', msg)
    })
})

server.listen(port, () => {
    console.log(`Hello world ${port}`)
})
