import Game from './Game.js';

function gameLaunch() {
    window.addEventListener('load', function () {
        const canvas = document.getElementById('canvas1');
        const ctx = canvas.getContext('2d');
        canvas.width = 720;
        canvas.height = 720;

        const game = new Game(canvas, ctx);

        // implementation of adjusted fps
        let startedLoop = 0;
        let lastTime = Date.now();
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
                game.render(deltaTime);
                fpsAdjustment = fpsAdjustment % 16.67;
            }
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    });
}

export default gameLaunch;
