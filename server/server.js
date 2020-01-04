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



var snake = require('./snake');



io.on('connection', socket => {

    console.log('user connected', socket.id);
    if(snake.config.connected <= snake.config.nop) {
        snake.config.connected++;
        var newSnake = JSON.parse(JSON.stringify(snake.snake));
        newSnake.cords.x = 100;
        newSnake.cords.y = 100;
        newSnake.id = socket.id;
        newSnake.move.heading = snake.const.LEFT;
        newSnake.move.direction = snake.const.LEFT;
        snake.snakes.push(newSnake);
        socket.emit('gameSetings', snake.config);
    }

    socket.on('disconnect', () => {
        console.log("user disconected", socket.id);
        snake.snakes = snake.snakes.filter(e => e.id != socket.id)
    })

    /*
    socket.on('snake', (res) => {
        snakes.forEach(e => {
            if(e.id == socket.id) {
                e.cords = res;
            }
        })
    })
    */

    socket.on('move', res => {
        snake.snakes.filter(e => e.id == socket.id)[0].move.heading = res.heading;
    })

});

setInterval(() => {

    io.emit('cordUpdate', {snakes: snake.snakes});
    if(snake.snakes[0]) {
        snake.snakes.forEach(e => {
            snake.move(e);
        })
        //console.log("cords:", snake.snakes[0].cords);
    }
    //console.log(snake.snakes);

}, 500);

server.listen(port, () => {
    console.log(`Server started and runing on port: ${port}`);
})
