import Game from './Game.js';

function gameLaunch() {
    window.addEventListener('load', function () {
        const canvas = document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');
        canvas.width = 720;
        canvas.height = 720;

        const game = new Game(canvas, ctx);

        let lastTime = 0;

        // implementation of adjusted fps
        let fpsAdjustment = 0;

        function animate(timeStamp) {
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            fpsAdjustment += deltaTime;

            // if condition for fps adjustment 60fps
            if (fpsAdjustment >= 16.67 && !game.isPaused) {
                // ctx.clearRect(0, 0, canvas.width, canvas.height);
                game.render(deltaTime);
                fpsAdjustment = fpsAdjustment % 16.67;
            }
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    });
}

export default gameLaunch;