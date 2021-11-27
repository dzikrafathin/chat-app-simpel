const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

const gabungHandler = require('./gabungHandler');
const pesanHandler = require('./pesanHandler');

const io = new socketio.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const onConnection = (socket) => {
    
    gabungHandler(io, socket);
    pesanHandler(io, socket);

}

io.on("connection", onConnection);

server.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
});