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
const port = 3001;
app.get('/', (req, res) => {
    res.send('2');
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(port, () => {
    console.log(`Hello world ${port}`);
});
