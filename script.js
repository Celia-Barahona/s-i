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

  // Cambiar fondo temporalmente
  document.body.style.backgroundColor = "#90ee90"; // verde clarito
  setTimeout(() => {
    document.body.style.backgroundColor = "#d3d3d3";
  }, 800);

  guessedLetters = [];
  updateGuessedLetters();

  if (checkCompletion()) {
    flashWord("green");
  } else {
    flashWord("red");
  }

  currentIndex++;
  if (currentIndex < words.length) {
    currentWord = words[currentIndex].toUpperCase();
    updateDisplay();
  } else {
    displayDiv.innerHTML = "<strong>¿Qué puede significar?</strong>";
    document.querySelector(".left").style.display = "block";
    document.querySelector(".right").style.display = "block";

    // Ocultar textos principales
    document.getElementById("title").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("guessedLettersContainer").style.display = "none";
  }
}

document.addEventListener("keydown", (e) => {
  const letter = e.key.toUpperCase();
  if (/^[A-ZÑ]$/.test(letter) && !guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    updateGuessedLetters();
    updateDisplay();

    if (checkCompletion()) {
      setTimeout(nextWord, 800);
    }
  }
});

updateDisplay();
