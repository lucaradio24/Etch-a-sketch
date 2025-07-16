const container = document.querySelector("#grid-container");
let isClickMode = true;
let isMouseDown = false;
let isRainbowMode = false;
let isHoverEnabled = false;
let isEraserMode = false;

let defaultColor = "#000000";

// Sposta gli event listener del mouse qui all'inizio
document.addEventListener("mousedown", () => (isMouseDown = true));
document.addEventListener("mouseup", () => (isMouseDown = false));

const colorPicker = document.querySelector("#colorPicker");
colorPicker.addEventListener("change", (e) => {
  defaultColor = e.target.value;
});

container.addEventListener("click", () => {
  if (!isClickMode) {
    // Aggiungi questo controllo
    isHoverEnabled = !isHoverEnabled;
  }
});

function toggleMode() {
  isClickMode = !isClickMode;
  isHoverEnabled = false; // Resetta hover quando cambi modalità
  const button = document.querySelector("#toggle-btn");
  button.classList.toggle("button-active");
}

const rgb = function () {
  let R = Math.round(Math.random() * 255);
  let G = Math.round(Math.random() * 255);
  let B = Math.round(Math.random() * 255);
  return `rgb(${R}, ${G}, ${B})`;
};

function toggleRGBMode() {
  isRainbowMode = !isRainbowMode;
  const button = document.querySelector("#rainbow-btn");
  button.classList.toggle("button-active");
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}

// Funzione per salvare l'immagine
function saveImage() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Ottieni le dimensioni del container
  const containerRect = container.getBoundingClientRect();
  canvas.width = containerRect.width;
  canvas.height = containerRect.height;

  // Sfondo bianco
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Disegna ogni quadrato
  const squares = container.querySelectorAll(".grid-square");
  squares.forEach((square, index) => {
    const squareRect = square.getBoundingClientRect();
    const x = squareRect.left - containerRect.left;
    const y = squareRect.top - containerRect.top;

    if (
      square.style.backgroundColor &&
      square.style.backgroundColor !== "rgb(248, 244, 240)"
    ) {
      ctx.fillStyle = square.style.backgroundColor;
      ctx.fillRect(x, y, squareRect.width, squareRect.height);
    }
  });

  // Scarica l'immagine
  const link = document.createElement("a");
  link.download = "etch-a-sketch.png";
  link.href = canvas.toDataURL();
  link.click();
}

// Funzione per attivare/disattivare la gomma
function toggleEraser() {
  isEraserMode = !isEraserMode;
  const eraserKnob = document.querySelector("#eraser-knob");

  if (isEraserMode) {
    eraserKnob.classList.add("knob-active");
    eraserKnob.style.boxShadow =
      "inset 8px 8px 16px #c4b9b0, inset -8px -8px 16px #ffffff";
  } else {
    eraserKnob.classList.remove("knob-active");
    eraserKnob.style.boxShadow =
      "15px 15px 30px #d4c9c0, -15px -15px 30px #ffffff";
  }
}

function createGrid(width, height) {
  container.innerHTML = "";

  // Rimuovi tutti gli stili inline che potrebbero causare problemi
  container.style.display = "";
  container.style.flexWrap = "";
  container.style.width = "";
  container.style.height = "";
  container.style.alignContent = "";

  for (let i = 0; i < width * height; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.style.width = `calc(100% / ${width})`;
    square.style.height = `calc(100% / ${height})`;
    square.dataset.passes = "0";

    // Aggiungi uno stile temporaneo per verificare che i quadrati siano visibili
    square.style.minWidth = "10px";
    square.style.minHeight = "10px";

    square.addEventListener("mouseover", () => {
      if (isClickMode && isMouseDown) {
        // Modalità Click
        if (isEraserMode) {
          // Modalità gomma
          square.style.backgroundColor = "#ffffff";
          square.dataset.passes = "0";
        } else {
          let passes = parseInt(square.dataset.passes);
          passes++;
          square.dataset.passes = passes;
          let opacity = passes * 0.1;
          if (isRainbowMode) {
            square.style.backgroundColor = rgb();
          } else {
            square.style.backgroundColor = `rgba(${hexToRgb(
              defaultColor
            )}, ${opacity})`;
          }
        }
      } else if (!isClickMode && isHoverEnabled) {
        // Modalità Hover
        if (isEraserMode) {
          // Modalità gomma
          square.style.backgroundColor = "#ffffff";
          square.dataset.passes = "0";
        } else {
          let passes = parseInt(square.dataset.passes);
          passes++;
          square.dataset.passes = passes;
          let opacity = passes * 0.1;
          if (isRainbowMode) {
            square.style.backgroundColor = rgb();
          } else {
            square.style.backgroundColor = `rgba(${hexToRgb(
              defaultColor
            )}, ${opacity})`;
          }
        }
      }
    });

    // Aggiungi anche l'evento click per disegnare direttamente
    square.addEventListener("click", () => {
      if (isEraserMode) {
        // Modalità gomma
        square.style.backgroundColor = "#ffffff";
        square.dataset.passes = "0";
      } else {
        let passes = parseInt(square.dataset.passes);
        passes++;
        square.dataset.passes = passes;
        let opacity = passes * 0.1;
        if (isRainbowMode) {
          square.style.backgroundColor = rgb();
        } else {
          square.style.backgroundColor = `rgba(${hexToRgb(
            defaultColor
          )}, ${opacity})`;
        }
      }
    });

    container.appendChild(square);
  }

  console.log(`Grid created: ${width}x${height} = ${width * height} squares`);
}

// Modifica l'array delle dimensioni per mantenere proporzioni simili
const gridSizes = [
  { width: 10, height: 5 },
  { width: 12, height: 6 },
  { width: 14, height: 7 },
  { width: 16, height: 8 },
  { width: 18, height: 9 },
  { width: 20, height: 10 },
  { width: 22, height: 11 },
];

// Aggiungi questa funzione per gestire lo slider
const slider = document.querySelector("#sizeSlider");
const sizeLabel = document.querySelector("#sizeLabel");

slider.addEventListener("input", function () {
  const size = gridSizes[this.value - 1];
  sizeLabel.textContent = `${size.width}x${size.height}`;
  createGrid(size.width, size.height);
});

// Modifica il bottone Clear per usare le dimensioni correnti
function getCurrentSize() {
  return gridSizes[slider.value - 1];
}

document.querySelector("#clear-btn").onclick = function () {
  const size = getCurrentSize();
  createGrid(size.width, size.height);
};

// Aggiungi event listeners per i bottoni
document.addEventListener("DOMContentLoaded", function () {
  // Event listeners per i bottoni
  document
    .getElementById("rainbow-btn")
    .addEventListener("click", toggleRGBMode);
  document.getElementById("toggle-btn").addEventListener("click", toggleMode);
  document.getElementById("clear-btn").addEventListener("click", function () {
    const size = getCurrentSize();
    createGrid(size.width, size.height);
  });

  // Event listeners per le manopole
  document.getElementById("save-knob").addEventListener("click", saveImage);
  document
    .getElementById("eraser-knob")
    .addEventListener("click", toggleEraser);

  // Inizializza lo slider e la griglia
  slider.value = "1";
  sizeLabel.textContent = `${gridSizes[0].width}x${gridSizes[0].height}`;
  const initialSize = gridSizes[0];
  createGrid(initialSize.width, initialSize.height);
});

// Remove grid lines
