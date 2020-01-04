module.exports = {

    config: {
        speed: 100,
        size: 10, 
        nop: 2, //antal spelare
        noa: 1, // antal äplen

        connected: 0
    },

    const: {
        UP: 0,
        DOWN: 1,
        LEFT: 2,
        RIGHT: 3
    },

    move(snake) {
    
        switch(snake.move.heading) {
            case 0:
                snake.move.y = -1;
                snake.move.x = 0;
                break;
            case 1:
                snake.move.y = 1;
                snake.move.x = 0;
                break;
            case 2:
                snake.move.y = 0;
                snake.move.x = 1;
                break;
            case 3:
                snake.move.y = 0;
                snake.move.x = -1;
                break; 
        }

        snake.cords.x += snake.move.x * this.config.size;
        snake.cords.y += snake.move.y * this.config.size;

        snake.move.direction = snake.move.headding;

    },

    snakes: [],

    snake: {
        id: 0,
        cords: {
            x: 0,
            y: 0
        },
        move: {
            heading: 0,
            direction: 0,

            x: 0,
            y: 0
        }
    }
}