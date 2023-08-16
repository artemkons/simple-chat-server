"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = require('http');
const app = (0, express_1.default)();
const server = http.createServer(app);
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(server);
const users_1 = require("./utils/users");
const port = 3001;
io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);
        io.to(room).emit('message', { user: { id: -1, username: 'bot' }, msg: `${username} has joined the chat` });
        const user = { id: socket.id, username, room };
        (0, users_1.addUser)(user);
        io.to(room).emit('enteredToRoom', {
            room,
            users: (0, users_1.getRoomUsers)(room)
        });
    });
    socket.on('chatMsg', (msg) => {
        const user = (0, users_1.getUser)(socket.id);
        if (user)
            io.to(user.room).emit('message', { user, msg: msg });
    });
    socket.on('disconnect', () => {
        const user = (0, users_1.removeUser)(socket.id);
        if (user) {
            const room = user.room;
            io.to(room).emit('message', { user: { id: -1, username: 'bot' }, msg: `${user.username} has left the chat` });
            io.to(room).emit('enteredToRoom', {
                room,
                users: (0, users_1.getRoomUsers)(room)
            });
        }
    });
});
server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
