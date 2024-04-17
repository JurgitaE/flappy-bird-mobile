class Background {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('background');
        this.image2 = document.getElementById('background2');
        this.width = 2400;
        this.height = this.game.baseHeight;
        this.scaledWidth;
        this.scaledHeight;
        this.x;
    }

    update() {
        if (this.game.incrementSpeed) {
            this.game.minSpeed += this.game.speedIncrementStep;
            this.game.maxSpeed += this.game.speedIncrementStep;
            this.game.incrementSpeed = false;

            this.game.speed += this.game.speedIncrementStep;
        }
        this.x -= this.game.speed;
        if (this.x + this.scaledWidth <= 0) this.x = 0;
    }

    draw() {
        this.game.ctx.drawImage(this.image, this.x, 0, this.scaledWidth, this.scaledHeight);
        let lastX = this.x;
        let calc = 1;
        // How many backgrounds to draw
        while (this.game.width >= this.scaledWidth + lastX) {
            lastX += this.scaledWidth - 2;
            this.game.ctx.drawImage(this.image, lastX, 0, this.scaledWidth, this.scaledHeight);
            calc++;
        }
    }

    resize() {
        this.scaledWidth = this.width * this.game.ratio;
        this.scaledHeight = this.height * this.game.ratio;
        this.x = 0;
    }
}

export default Background;
