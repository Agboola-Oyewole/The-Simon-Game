var levelNumber = 1;
var listOfColors = ["green", "red", "yellow", "blue"];
var randomSelection = [];
var userSelection = [];
var isGameActive = true;

const typed = new Typed(".typed", {
  strings: ["Welcome to the Simon Game!", "Press The Start Button to Begin."],
  typeSpeed: 100, // Typing speed in milliseconds
  backSpeed: 50, // Backspacing speed in milliseconds
  backDelay: 2000, // Delay before starting to backspace
  loop: false, // Loop the animation
  showCursor: true, // Show blinking cursor
  cursorChar: "|", // Cursor character
  startDelay: 0, // Delay before starting the animation
});

$("button").on("click", startGame);

function nextSequence() {
  var randomButton = Math.floor(Math.random() * 4);
  $("#level-title").text("Level " + levelNumber);
  $("." + listOfColors[randomButton])
    .fadeOut(150)
    .fadeIn(150);
  playSound(listOfColors[randomButton]);
  buttonPressAnimation(listOfColors[randomButton]);
  randomSelection.push(listOfColors[randomButton]);
}

function startGame() {
  $(".input-div").remove();
  $(".typed-cursor").remove();
  $("#level-title").remove();
  $(".container").before('<h1 id="level-title">Level 1</h1>');
  $(".btn").off("click", gameOverAnimation);
  $("button").off("click", startGame);
  levelNumber = 1;
  userSelection = [];
  randomSelection = [];
  nextSequence();
  var buttonNumber = $(".btn").length;
  for (let index = 0; index < buttonNumber; index++) {
    document
      .querySelectorAll(".btn")
      [index].addEventListener("click", buttonClickHandler);
  }
}

function gameOver() {
  $(".description").before(
    '<div class="input-div" style="margin-top: 100px; text-align: center;"><button>START</button></div>'
  );
  $("#level-title").text(
    "Game Over! Your score was " +
      levelNumber +
      ", Press the Start button to restart."
  );
  gameOverAnimation();
  var buttonNumber = $(".btn").length;
  for (let index = 0; index < buttonNumber; index++) {
    document
      .querySelectorAll(".btn")
      [index].removeEventListener("click", buttonClickHandler);
  }
  $(".btn").on("click", gameOverAnimation);
}

function nextRound() {
  userSelection.length = 0;
  levelNumber++;
  setTimeout(function () {
    nextSequence();
  }, 1000);
}

function gameOverAnimation() {
  var activeButton = $("body");
  var gameOverSound = new Audio("sounds/wrong.mp3");
  gameOverSound.play();
  activeButton.addClass("game-over");
  setTimeout(function () {
    activeButton.removeClass("game-over");
  }, 200);
}

function playSound(key) {
  switch (key) {
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    default:
      console.error("Invalid Color");
      return NaN;
  }
}

function buttonPressAnimation(key) {
  var activeButton = $("." + key);
  activeButton.addClass("pressed");
  setTimeout(function () {
    activeButton.removeClass("pressed");
  }, 150);
}

function buttonClickHandler() {
  var buttonClicked = this.classList[1];
  playSound(buttonClicked);
  buttonPressAnimation(buttonClicked);
  userSelection.push(buttonClicked);

  let arraysAreEqual = true;

  for (let i = 0; i < userSelection.length; i++) {
    if (userSelection[i] !== randomSelection[i]) {
      arraysAreEqual = false;
      break; // Exit the loop if any pair of elements is not equal
    }
  }

  if (arraysAreEqual && userSelection.length === randomSelection.length) {
    nextRound();
  }
  if (arraysAreEqual === false) {
    gameOver();
    $("button").on("click", startGame);
  }
}
