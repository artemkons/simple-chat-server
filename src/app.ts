import express from 'express'
const http = require('http');

const app = express()
const server = http.createServer(app);

import { Server } from 'socket.io'
const io = new Server(server)

import { addUser, getUser, removeUser } from './utils/users'

const port = 3001

io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room)

        socket.emit('message', `Welcome to ${room}!`)
        io.to(room).emit('message', `${username} has joined the chat`)

        const user = { id: socket.id, username, room }
        addUser(user)
    })

    socket.on('chatMsg', (msg) => {
        const user = getUser(socket.id)

        if (user) io.to(user.room).emit('message', msg)
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', `${user.username} has left the chat`)
        }
    }) 
})

server.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
