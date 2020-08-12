var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;

function nextSequence() {
  var randomNumber = Math.random();
  randomNumber = randomNumber * 3 + 1;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  $("#level-title").text("level " + level);
  level += 1;
}



$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");

  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}
// initialize the game by keypress
var started = false;
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {

      // call nextSequence() after 1s delay

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {

    console.log("wrong");
    $("#level-title").html("Game over, press any key to restart");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
     // if wrong then call startOver() function to restart the game
    startOver();
  }
}

function startOver() {
  //set all the variable to initial values
  level = 1;
  gamePattern = [];
  started = false;
}
