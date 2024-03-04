import Game from './javascript/Game.js';

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

        //if condition for fps adjustment 60fps
        if (fpsAdjustment >= 16.67) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.render(deltaTime);
            fpsAdjustment = 0;
        }
        if (!game.gameOver) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
});
