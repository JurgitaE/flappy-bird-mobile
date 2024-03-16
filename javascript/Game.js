import AudioControl from './AudioControl.js';
import Background from './Background.js';
import InputHandler from './InputHandler.js';
import Obstacle from './Obstacle.js';
import Player from './Player.js';
import UI from './UI.js';

class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 720; //same as background image height
        this.ratio = window.innerHeight / this.baseHeight;
        this.background = new Background(this);
        this.player = new Player(this);
        this.sound = new AudioControl(this);
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.obstacles = [];
        this.numberOFObstacles = 15;
        this.gravity;
        this.speed;
        this.minSpeed;
        this.maxSpeed;
        this.score;
        this.gameOver;
        this.bottomMargin;
        this.timer;
        this.message1;
        this.message2;
        this.eventTimer = 0;
        this.eventInterval = 150;
        this.eventUpdate = false;
        this.touchStartX;
        this.mouseStartX;
        this.swipeDistance = 50;
        this.debug = false;
        this.isPaused = false;
        this.visibilityChanged = false;
        this.hasStarted = false;
        this.soundOn = true;
        this.resize(window.innerWidth, window.innerHeight);
    }
    resize(width, height) {
        this.isPaused = false;
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratio = this.height / this.baseHeight;

        this.ui.resize();
        this.ctx.font = `${this.ui.smallFont}px ${this.ui.font}`;
        this.ctx.textAlign = 'right';
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'white';

        this.bottomMargin = Math.floor(50 * this.ratio);
        this.gravity = 0.15 * this.ratio;
        this.speed = 2 * this.ratio;
        this.minSpeed = this.speed;
        this.maxSpeed = this.speed * 5;
        this.background.resize();
        this.player.resize();
        this.createObstacles();
        this.obstacles.forEach(obstacle => {
            obstacle.resize();
        });
        this.score = 0;
        this.gameOver = false;
        this.timer = 0;
    }

    render(deltaTime) {
        if (!this.gameOver && !document.hidden) {
            if (!this.visibilityChanged) {
                this.timer += deltaTime;
            } else {
                this.visibilityChanged = false;
            }
        }
        this.handlePeriodicEvents(deltaTime);
        this.background.update();
        this.background.draw();
        this.ui.draw();
        this.player.update();
        this.player.draw();
        this.obstacles.forEach(obstacle => {
            obstacle.update();
            obstacle.draw();
        });
    }
    createObstacles() {
        this.obstacles = [];
        const firstX = this.baseHeight * this.ratio;
        const obstacleSpacing = 600 * this.ratio;
        for (let i = 0; i < this.numberOFObstacles; i++) {
            this.obstacles.push(new Obstacle(this, firstX + i * obstacleSpacing));
        }
    }
    checkCollision(a, b) {
        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;
        const distance = Math.hypot(dx, dy);
        const sumOfRadii = a.collisionRadius + b.collisionRadius;
        return distance <= sumOfRadii;
    }

    handlePeriodicEvents(deltaTime) {
        if (this.eventTimer < this.eventInterval) {
            this.eventTimer += deltaTime;
            this.eventUpdate = false;
        } else {
            this.eventTimer = this.eventTimer % this.eventInterval;
            this.eventUpdate = true;
        }
    }
    triggerGameOver() {
        if (!this.gameOver) {
            this.gameOver = true;
            if (this.obstacles.length <= 0) {
                this.sound.play(this.sound.win);
                this.message1 = 'Nailed it!';
                this.message2 = 'Can  you do it faster than ' + this.ui.formatTimer() + ' seconds?';
            } else {
                this.sound.play(this.sound.lose);
                this.message1 = 'Getting rusty?';
                this.message2 = 'Collision time ' + this.ui.formatTimer() + ' seconds';
            }
        }
    }
}

export default Game;
