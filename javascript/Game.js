import Player from './Player.js';

class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
    }
    render() {
        this.ctx.fillStyle = 'red';
        this.player.update();
        this.player.draw();
    }
}

export default Game;
