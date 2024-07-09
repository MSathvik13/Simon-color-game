var level = 0;
var userClickedPattern = []; // Store user clicked pattern
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []; // Store random game pattern

var started = false;

// Reset level and other variables to reset & restart game.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Sense the keys entered to enter and restart game.
$(document).on("keydown", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// jQuery to detect which button was clicked.
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswers(userClickedPattern.length - 1);
});

function nextSequence() {
  level += 1;
  userClickedPattern = [];
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); // Range of random 0 to 3.
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  //  jQuery to flash colour randomly.
  $("." + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // Play music related to colour selected
  playSound(randomChosenColour);
}

function playSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var buttonColour = $("#" + currentColour);
  buttonColour.addClass("pressed");
  setTimeout(function () {
    // Remove pressed css class properties after 100 ms
    buttonColour.removeClass("pressed");
  }, 100);
}

// Check users selection squence against the game sequence.
function checkAnswers(currentLevel) {
  console.log(userClickedPattern);
  console.log(gamePattern);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong.");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game over, Press Any Key to Restart");
    startOver();
  }
}
