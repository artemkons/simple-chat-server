import express from 'express'
const http = require('http');

const app = express()
const server = http.createServer(app);

import { Server } from 'socket.io'
const io = new Server(server)

import { addUser, getUser, removeUser, getRoomUsers } from './utils/users'

const port = 3001

io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room)

        io.to(room).emit('message', { user: { id: -1, username: 'bot' }, msg: `${username} has joined the chat` })

        const user = { id: socket.id, username, room }
        addUser(user)

        io.to(room).emit('enteredToRoom', {
            room,
            users: getRoomUsers(room)
        })
    })

    socket.on('chatMsg', (msg) => {
        const user = getUser(socket.id)

        if (user) io.to(user.room).emit('message', { user, msg: msg})
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            const room = user.room
            io.to(room).emit('message', { user: { id: -1, username: 'bot' }, msg: `${user.username} has left the chat` })

            io.to(room).emit('enteredToRoom', {
                room,
                users: getRoomUsers(room)
            })
        }
    }) 
})

server.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
