class UI {
    constructor(game) {
        this.game = game;
        this.font = 'Bungee';
        this.smallFont;
        this.largeFont;
    }

    draw() {
        this.game.ctx.save();
        this.game.ctx.fillText(`Score: ${this.game.score}`, this.game.width - this.smallFont, this.largeFont);
        this.game.ctx.textAlign = 'left';
        this.game.ctx.fillText(`Timer: ${this.formatTimer()}`, this.smallFont, this.largeFont);
        if (this.game.gameOver) {
            this.game.ctx.textAlign = 'center';
            this.game.ctx.font = `${this.largeFont}px ${this.font}`;
            this.game.ctx.fillText(
                this.game.message1,
                this.game.width * 0.5,
                this.game.height * 0.5 - this.largeFont,
                this.game.width
            );
            this.game.ctx.font = `${this.smallFont}px ${this.font}`;
            this.game.ctx.fillText(
                this.game.message2,
                this.game.width * 0.5,
                this.game.height * 0.5 - this.smallFont,
                this.game.width
            );
            this.game.ctx.fillText(
                `Press 'R' to try again!`,
                this.game.width * 0.5,
                this.game.height * 0.5,
                this.game.width
            );
        }

        this.game.ctx.fillStyle = 'orange';
        if (this.game.player.energy <= this.game.player.minEnergy) this.game.ctx.fillStyle = 'red';
        else if (this.game.player.energy >= this.game.player.maxEnergy) this.game.ctx.fillStyle = 'green';
        for (let i = 0; i < this.game.player.energy; i++) {
            this.game.ctx.fillRect(
                10,
                this.game.height - 10 - i * this.game.player.barSize,
                this.game.player.barSize * 5,
                this.game.player.barSize
            );
        }
        this.game.ctx.restore();
    }
    formatTimer() {
        return (this.game.timer * 0.001).toFixed(2);
    }
    resize() {
        this.smallFont = Math.ceil(20 * this.game.ratio);
        this.largeFont = Math.ceil(45 * this.game.ratio);
    }
}

export default UI;
