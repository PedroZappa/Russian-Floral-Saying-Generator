import './styles.css'

// Russian Floral Sayings Array
var floralSayings = [
  "Roses are red, Violets are blue, In Soviet Russia, poem writes you.",
  "Roses are red, Violets are blue, In Soviet Russia, birthday wishes you.",
  "Roses are red, Violets are blue, In Soviet Russia, vodka drinks you.",
  "Roses are red, Violets are blue, In Soviet Russia, guitar plays you.",
  "Roses are red, Violets are blue, In Soviet Russia, food eats you.",
  "Roses are red, Violets are blue, In Soviet Russia, button clicks you.",
  "Roses are red, Violets are blue, In Soviet Russia, calm keeps you.",
  "Roses are red, Violets are blue, In Soviet Russia, weed smokes you.",
  "Roses are red, Violets are blue, In Soviet Russia, computer programs you.",
  "Roses are red, Violets are blue, In Soviet Russia, ice warms you."
];

// Random floralSayings Index Generator
function getRandomSaying() {
  var randomSayingIndex = Math.floor(Math.random() * floralSayings.length);
  var randomSaying = floralSayings[randomSayingIndex];
  document.querySelector(".saying-display").innerHTML = "☭ " + randomSaying + " ☭";
}

// Variables
var generateButton = document.querySelector(".generate");

// Event Listeners
  // Mouse Click
generateButton.addEventListener("click", getRandomSaying);
  // Keyboard
document.addEventListener("keypress", getRandomSaying);
