const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const publicpath = path.join(__dirname, '/../public');
const port = process.env.PORT | 3000;
let app = express();
let server = http.createServer(app)
let io = socketio(server);

app.use(express.static(publicpath));

server.listen(port, () => {
    console.log(`Server started and runing on port: ${port}`);
})
