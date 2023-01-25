var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = true;
var level = 0;

$(document).keypress(function(){
    if(started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = false;
    }
});
$(".btn").click(function(){

    var useChosenColour = $(this).attr("id");
    userClickedPattern.push(useChosenColour);

    playSound(useChosenColour);
    animatePress(useChosenColour);

    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text( "Game Over, Press Any Key to Restart" );

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = true;
}