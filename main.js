const canvas = document.getElementById("canvas-game");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const game = new Game();

document.addEventListener("mousedown", onMouseClick);

function onMouseClick(event) {}

let lastTime;
let accumulator = 0;
const step = 1 / 60;

function gameRun(timestamp) {
  if (lastTime) {
    let deltaTime = (timestamp - lastTime) / 1000;
    accumulator += deltaTime;
    while (accumulator > step) {
      game.update(step);
      accumulator -= step;
    }
    game.fps = 1 / deltaTime;
  }

  game.draw();
  lastTime = timestamp;
  requestAnimationFrame(gameRun);
}

gameRun();
