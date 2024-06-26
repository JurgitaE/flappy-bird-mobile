class Obstacle {
    constructor(game, x) {
        this.game = game;
        this.spriteWidth = 120;
        this.spriteHeight = 120;
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.height;
        this.x = x;
        this.y = Math.random() * (this.game.height - this.scaledHeight);
        this.collisionX;
        this.collisionY;
        this.collisionRadius;
        this.speedY = Math.random() < 0.5 ? -1 * this.game.ratio : 1 * this.game.ratio;
        this.markedForDeletion = false;
        this.image = document.getElementById('smallGears');
        this.frameX = Math.floor(Math.random() * 4);
    }
    update() {
        this.x -= this.game.speed;
        this.y += this.speedY;
        this.collisionX = this.x + this.scaledWidth / 2;
        this.collisionY = this.y + this.scaledHeight / 2;
        if (!this.game.gameOver) {
            if (this.y + this.scaledHeight >= this.game.height || this.y <= 0) this.speedY *= -1;
        } else {
            this.speedY += 0.1;
        }
        if (this.isOffScreen()) {
            this.markedForDeletion = true;
            this.game.obstacles = this.game.obstacles.filter(obstacle => !obstacle.markedForDeletion);
            if (!this.game.gameOver) {
                this.game.score++;
                if (this.game.score > this.game.highScore) {
                    localStorage.setItem('highScore', this.game.score);
                    this.game.highScore = this.game.score;
                }
            }
            if (this.game.obstacles.length <= 0) this.game.triggerGameOver();
            if (this.game.score && this.game.score % 3 === 0) {
                this.game.incrementSpeed = true;
            }
        }
        if (this.game.checkCollision(this, this.game.player)) {
            this.game.player.collided = true;
            this.game.player.stopCharge();
            this.game.triggerGameOver();
        }
    }

    draw() {
        this.game.ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.scaledWidth,
            this.scaledHeight
        );
        if (this.game.debug) {
            this.game.ctx.beginPath();
            this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
            this.game.ctx.stroke();
        }
    }

    resize() {
        this.scaledWidth = this.spriteWidth * this.game.ratio;
        this.scaledHeight = this.spriteHeight * this.game.ratio;
        this.collisionRadius = this.scaledWidth * 0.4;
    }
    isOffScreen() {
        return this.x + this.scaledWidth < 0 || this.y > this.game.height;
    }
}

export default Obstacle;
