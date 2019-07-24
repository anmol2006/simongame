//Declare initial variables

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Random Number Generation

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeTo(100, 0).fadeTo(0, 1);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

//Handling user click

$("div.btn").click(function(e) {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer((userClickedPattern.length) - 1);
  e.stopPropagation();  //To prevent bubbling towards top and interfering with whole document click
});

//Function To Play Sound

function playSound(name) {
  var soundToPlay = new Audio('sounds/' + name + '.mp3');
  soundToPlay.play();
}

//Function to Animate press

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Only first keypress starts game

$(document).keydown(function() {
  if (started == false) {
    setTimeout(nextSequence, 300);
    started = true;
    $("h3").remove();
  }
});

//Only first Mouse click starts game
$(document).click(function(e) {
  if (started == false) {
    setTimeout(nextSequence, 300);
    started = true;
    $("h3").remove();
  }
});


//Function to Check User Answer

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    // console.log("success");
    if (currentLevel === gamePattern.length - 1) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    // console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over! Press any key (or tap) to restart");
    $("#level-title").after("<h3 class='heading-style score'> Score: " + (gamePattern.length - 1) + "</h3>");
    setTimeout(startOver,500);
  }
}

//Function To Start Over in case of wrong answer

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];
}
