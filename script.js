const words = ["rojo", "morado", "perla", "amarillo", "verde", "naranja", "blanco"];
const colorMap = {
  rojo: "red",
  morado: "purple",
  perla: "aquamarine", // Perla en aguamarina
  amarillo: "yellow",
  verde: "green",
  naranja: "orange",
  blanco: "white"
};

let currentIndex = 0;
let currentWord = words[currentIndex].toUpperCase();
let guessedLetters = [];

const displayDiv = document.getElementById("wordDisplay");
const guessedList = document.getElementById("guessedList");
const guessedLettersSpan = document.getElementById("guessedLetters");
const letterInput = document.getElementById("letterInput");

function updateDisplay() {
  let display = "";
  for (let letter of currentWord) {
    display += guessedLetters.includes(letter) ? `<span class="letter">${letter}</span>` : `<span class="letter">_</span>`;
  }
  displayDiv.innerHTML = display;
}

function updateGuessedLetters() {
  guessedLettersSpan.innerHTML = guessedLetters.join(", ");
}

function checkCompletion() {
  return currentWord.split("").every(letter => guessedLetters.includes(letter));
}

function flashWord(color) {
  displayDiv.classList.add("flashing");
  displayDiv.style.color = color;
  setTimeout(() => {
    displayDiv.classList.remove("flashing");
    displayDiv.style.color = "";
  }, 500);
}

function nextWord() {
  const originalWord = words[currentIndex];
  const color = colorMap[originalWord] || "black";

  guessedList.innerHTML += `<div class="guessed" style="color:${color}">${originalWord.toUpperCase()}</div>`;

  document.body.style.backgroundColor = "#90ee90"; // verde clarito
  setTimeout(() => {
    document.body.style.backgroundColor = "#d3d3d3";
  }, 800);

  guessedLetters = [];
  updateGuessedLetters();

  currentIndex++;
  if (currentIndex < words.length) {
    currentWord = words[currentIndex].toUpperCase();
    updateDisplay();
  } else {
    displayDiv.innerHTML = "<strong>¿Qué puede significar?</strong>";
    document.querySelector(".left").style.display = "block";
    document.querySelector(".right").style.display = "block";

    document.getElementById("title").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("guessedLettersContainer").style.display = "none";
    letterInput.style.display = "none"; // Ocultamos el campo de entrada
  }
}

// Evento para manejar el input del usuario
letterInput.addEventListener("input", (e) => {
  const letter = e.target.value.toUpperCase(); // Convertimos la letra a mayúscula
  if (/^[A-ZÑ]$/.test(letter) && !guessedLetters.includes(letter)) {
    guessedLetters.push(letter); // Añadimos la letra a las letras adivinadas
    updateGuessedLetters();
    updateDisplay();

    // Verificamos si la palabra está completa
    if (checkCompletion()) {
      setTimeout(nextWord, 800); // Pasar a la siguiente palabra tras completar
    }
  }

  // Dejamos la letra en el input por 0.5 segundos y luego lo limpiamos
  setTimeout(() => {
    e.target.value = ""; // Limpiamos el campo automáticamente
  }, 250); // Tiempo reducido a medio segundo
});

// Inicializamos la visualización
updateDisplay();
