const canvas = document.getElementById("canvas-game");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;



const game = new Game();

document.addEventListener("mousedown", onMouseClick);

let img = new Image();
img.src = "./resource/the-guy.png";

function onMouseClick(event) {}

let lastTime = 0;
function gameRun(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.draw();
  game.update(deltaTime);
  requestAnimationFrame(gameRun);
}

gameRun();
