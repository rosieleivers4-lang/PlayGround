import "./style.css";
import { Game } from "./game/Game.js";

const canvas = document.getElementById("scene");

function showFatal(message) {
  const loading = document.getElementById("loading");
  if (!loading) return;
  loading.classList.remove("done");
  loading.innerHTML = `
    <div class="load-brand" style="letter-spacing:.2em">PUPWILD</div>
    <div style="max-width:420px;text-align:center;font-size:13px;line-height:1.6;color:#b9c6b0;padding:0 24px">
      ${message}
    </div>`;
}

try {
  const game = new Game(canvas);
  window.__pupwild = game;
  game.boot().catch((error) => {
    console.error(error);
    showFatal("The woods could not wake. Please reload, or try a browser with WebGL enabled.");
  });
} catch (error) {
  console.error(error);
  showFatal("This device could not start the 3D forest. Please try another browser with WebGL enabled.");
}

document.addEventListener("contextmenu", (e) => {
  if (e.target.closest("#app")) e.preventDefault();
});

if (window.innerWidth < 700 && window.innerHeight > window.innerWidth) {
  const hint = document.getElementById("rotate-hint");
  if (hint) {
    hint.style.display = "flex";
    setTimeout(() => { hint.style.display = "none"; }, 2600);
    hint.addEventListener("pointerdown", () => { hint.style.display = "none"; });
  }
}
