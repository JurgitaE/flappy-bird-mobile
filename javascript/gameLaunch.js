import Game from './Game.js';

function gameLaunch() {
    window.addEventListener('load', function () {
        const canvas = document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');
        canvas.width = 720;
        canvas.height = 720;

        const game = new Game(canvas, ctx);

        let startedLoop = 0;
        let lastTime = Date.now();

        // implementation of adjusted fps
        let fpsAdjustment = 0;

        function animate() {
            if (game.hasStarted && startedLoop === 0) {
                lastTime = Date.now();
                startedLoop = 1;
            }

            let timeNow = Date.now();
            const deltaTime = timeNow - lastTime;
            lastTime = timeNow;
            fpsAdjustment += deltaTime;

            // if condition for fps adjustment 60fps
            if (fpsAdjustment >= 16.67 && !game.isPaused && game.hasStarted) {
                // ctx.clearRect(0, 0, canvas.width, canvas.height);
                game.render(deltaTime);
                fpsAdjustment = fpsAdjustment % 16.67;
            }
            requestAnimationFrame(animate);
        }

        animate(0);
    });
}

export default gameLaunch;
