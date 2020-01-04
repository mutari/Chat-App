
//connect to the server
var socket = io();

var seting;

socket.on('gameSetings', res => {
    seting = res;
})

socket.on('cordUpdate', res => {
    //clear screan
    var clear = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);

    graphics.fillStyle(0xaa0000);
    graphics.fillRectShape(clear);
    graphics.fillStyle(0x000000);

    //draw snake
    res.snakes.forEach(e => {
        var rect = new Phaser.Geom.Rectangle(e.cords.x, e.cords.y, seting.size, seting.size);
        graphics.fillRectShape(rect);
    });

})

// draw
var config = {
    width: 800,
    height: 600,
    backgroundColor: 0xEE0000,
    scene: {
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);


//kayes
var KEYA;
var KEYW;
var KEYD;
var KEYS;


//const
const UP = 0, DOWN = 1, LEFT = 2, RIGHT = 3;

//snake direktion
var heading = LEFT;
var direction = heading;

var graphics;

function create() {

    //tagent bord bulshit
    KEYA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    KEYW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    KEYD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    KEYS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);


    graphics = this.add.graphics({lineStyle: {width: 2, color: 0x00aa00}, fillStyle: {color: 0x0000aa}});
}

function update(time, delta) {

    if(KEYA.isDown) {
        heading = RIGHT;
    }
    else if(KEYW.isDown) {
        heading = UP;
    }
    else if(KEYD.isDown) {
        heading = LEFT
    }
    else if(KEYS.isDown) {
        heading = DOWN;
    }

    if(direction != heading) {
        socket.emit('move', {heading: heading})
        direction = heading;
    }

}