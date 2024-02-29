import Player from './Player.js';

class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720;
        this.ratio = this.height / this.baseHeight;
        this.player = new Player(this);
        this.gravity;

        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', e => {
            this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
        });

        this.canvas.addEventListener('mousedown', e => {
            this.player.flap();
        });
    }
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.fillStyle = 'red';
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = this.height / this.baseHeight;

        this.gravity = 0.15 * this.ratio;
        this.player.resize();
    }

    // mouse countrols

    render() {
        this.player.update();
        this.player.draw();
    }
}

export default Game;
