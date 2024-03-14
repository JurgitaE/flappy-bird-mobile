class InputHandler {
    constructor(game) {
        this.game = game;
        this.btn = document.getElementById('start');
        this.intro = document.getElementById('intro');
        this.controls = document.getElementById('controls-container');
        this.retry = document.getElementById('retry');
        this.pause = document.getElementById('pause');
        this.sound = document.getElementById('sound');

        this.keysPressed = [];

        this.sound.addEventListener('click', () => {
            if (this.game.soundOn) {
                this.game.soundOn = false;
                document.querySelector('#sound img').src = './img/mute.png';
            } else {
                this.game.soundOn = true;
                document.querySelector('#sound img').src = './img/volume.png';
            }
        });
        this.btn.addEventListener('click', () => {
            this.intro.style.display = 'none';
            this.controls.style.display = 'flex';
            this.game.hasStarted = true;
        });
        this.retry.addEventListener('click', () => {
            this.game.resize(window.innerWidth, window.innerHeight);
        });
        this.pause.addEventListener('click', e => {
            e.preventDefault();
            this.togglePause();
        });

        document.addEventListener('visibilitychange', () => (this.game.visibilityChanged = true));

        window.addEventListener('resize', e =>
            this.game.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight)
        );

        // Mouse countrols
        this.game.canvas.addEventListener('mousedown', e => this.game.player.flap());
        this.game.canvas.addEventListener('mouseup', e => setTimeout(() => this.game.player.wingsUp(), 50));

        // Keyboard controls
        window.addEventListener('keydown', e => {
            if (this.keysPressed.indexOf(e.key.toLowerCase()) === -1) {
                if (e.key === ' ' || e.key === 'Enter') {
                    this.game.player.flap();
                }
                if (e.key === 'Shift' || e.key.toLowerCase() === 'c') this.game.player.startCharge();
                // if (e.key.toLowerCase() === 'd') this.game.debug = !this.game.debug;
                if (e.key.toLowerCase() === 'r') this.game.resize(window.innerWidth, window.innerHeight);
                if (e.key.toLowerCase() === 'p') this.togglePause();
                this.keysPressed.push(e.key.toLowerCase());
            }
        });

        window.addEventListener('keyup', e => {
            if (e.key === ' ' || e.key === 'Enter') {
                this.game.player.wingsUp();
            }

            this.keysPressed.splice(this.keysPressed.indexOf(e.key.toLowerCase()), 1);
        });
        // Touch controls
        this.game.canvas.addEventListener('touchstart', e => {
            this.game.touchStartX = e.changedTouches[0].pageX;
        });

        this.game.canvas.addEventListener('touchmove', e => {
            e.preventDefault();
        });

        this.game.canvas.addEventListener('touchend', e => {
            if (e.changedTouches[0].pageX - this.game.touchStartX > this.game.swipeDistance) {
                this.game.player.startCharge();
            } else {
                this.game.player.flap();
            }
        });
    }
    togglePause() {
        if (!this.game.isPaused) {
            this.game.isPaused = true;
        } else if (this.game.isPaused) {
            this.game.isPaused = false;
        }
    }
}

export default InputHandler;
