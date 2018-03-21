/**
 * Created by scoogumss on 24/01/2018.
 */
var quizArray = [];
var currentAnswers =[];
var randomFlag;
var correctAnswer;
var correctAnswerPosition;
var correctAnswerIndexPosition;
var indexOfRandomFlag;
var userInput;
var userScore = 0;
var currentQuestion = 0;
var hidden = false;
var storedScores = [];

var hiddenImageNames = true;
var userAnswered = false;

$(document).ready(function () {
    $("#quizFinished").hide();
    $("#rightOrWrong").hide();
    quizArray = JSON.parse(localStorage["flagsArray"]);
    $("#retryButton").click( function() {
        currentQuestion = 1;
        userScore = 0;
        $("#answers").show();
        $("#quizUI").show();
        $("#quizFinished").hide();
        quizController();
    });
    $("#continueButton").click( function() {
        console.log("Boop");
        userAnswered = false;
        hiddenImageNames = false;
        $("#answers").show();
        $("#rightOrWrong").hide();
    });
    if (localStorage["scoresArray"]) {
        storedScores = JSON.parse(localStorage["scoresArray"]);
    } else {
        localStorage["scoresArray"] = JSON.stringify(storedScores);
    }
    createQuizQuestions();
    hideOrShowImageNames();
    bindImageClick();
    quizController();
});

function createQuizQuestions() {
    for (var i = 1; i < 7; i++) {
        $('#albumStuff').append("<div class=" + "card" +"><img src=" + quizArray[1].flagPath + ".png + id=" + i + " + alt=" + "Card image cap" + "><p class=" + "card-text" + " + id=" + 1 + i + " +> " + quizArray[1].flagName + "</p></div>");
    }
}

/**
 * Changed them both to hide cos it messed with the sizing of everything.
 */
function hideOrShowImageNames() {
    if (hiddenImageNames) {
        for (var i = 1; i < 7; i++) {
            $('#1' + i + '').hide();
        }
    } else {
        for (var i = 1; i < 7; i++) {
            $('#1' + i + '').hide();
        }
    }
}

function bindImageClick () {
    $('img').on("click", function() {
        if (userAnswered) {

        } else {
            userAnswered = true;
            console.log("User clicked on " + this.id);
            selectAnswer(this.id);
            quizController();
        }
    });
}

function quizController() {
    currentQuestion+=1;
    $("#correctOrWrong").text("Select the correct answer!");
    unhighlightCorrectAnswer();
    updateStageAndScore();
    if (currentQuestion > 10) {
        console.log("Quiz Over");
        $("#answers").hide();
        $("#quizUI").hide();
        $("#rightOrWrong").hide();
        $("#quizFinished").show();
        $('#quizResults').html(userScore + "/10");
        storedScores.push(userScore);
        localStorage["scoresArray"] = JSON.stringify(storedScores);
    } else {
        quizArray = JSON.parse(localStorage["flagsArray"]);
        hiddenImageNames = true;
        hideOrShowImageNames();
        selectRandomFlag();
    }
}

function updateStageAndScore() {
    if (currentQuestion < 11) {
        $('#stage').html("Question " + currentQuestion + "/10");
    }
    $('#score').html("Score " + userScore + "/10");
}

function selectAnswer(userInput) {
    hiddenImageNames = false;
    $('#rightOrWrongImage').attr("src"," "+ correctAnswer.flagPath + ".png");
    if (userInput == correctAnswerPosition) {
        userScore+=1;
        console.log("The user selected the correct answer.");
        //$("#correctOrWrong").text("You selected the correct answer. Click an image again to continue.");
        highlightCorrectAnswer();
        hideOrShowImageNames();
        updateStageAndScore();
        $("#answers").hide();
        $("#rightOrWrong").show();
        $("#rightOrWrongAnswer").text("Correct!")
    } else {
        console.log("User selected the wrong answer.");
        //$("#correctOrWrong").text("You selected the wrong answer. Click an image again to continue.");
        highlightCorrectAnswer();
        hideOrShowImageNames();
        $("#answers").hide();
        $("#rightOrWrong").show();
        $("#rightOrWrongAnswer").text("Wrong. The correct answer is " + correctAnswer.flagName);
    }
}

function highlightCorrectAnswer() {
    for (var i = 1; i < 7; i++) {
        if (i != correctAnswerPosition) {
            randomiseFlag();
            $('#' + i + '').addClass('wrong');
        } else {
            $('#' + correctAnswerPosition + '').addClass('right');
        }
    }
}

function unhighlightCorrectAnswer() {
    for (var i = 1; i < 7; i++) {
        if (i != correctAnswerPosition) {
            randomiseFlag();
            $('#' + i + '').removeClass('wrong');
        } else {
            $('#' + correctAnswerPosition + '').removeClass('right');
        }
    }
}

function selectRandomFlag () {
    randomiseFlag();
    $("#flagImage").html("<h2>Which flag is: " + randomFlag.flagName + "</h2>");
    correctAnswer = randomFlag;
    correctAnswerIndexPosition = indexOfRandomFlag;
    correctAnswerPosition = Math.floor(Math.random()*4+1);
    console.log("Selected " + randomFlag.flagName);
    console.log("The index of the correct flag is " + correctAnswerIndexPosition);
    setAnswers();
}

function randomiseFlag() {
    indexOfRandomFlag = Math.floor(Math.random()*quizArray.length);
    randomFlag = quizArray[indexOfRandomFlag];
    quizArray.splice(indexOfRandomFlag, 1);
}

function setAnswers() {
    currentAnswers =[];
    $('#' + correctAnswerPosition + '').attr("src"," "+ correctAnswer.flagPath + ".png");
    $('#1' + correctAnswerPosition +'').html(correctAnswer.flagName);
    for (var i = 1; i < 7; i++) {
        if (i != correctAnswerPosition) {
            randomiseFlag();
            $('#' + i + '').attr("src"," "+ randomFlag.flagPath + ".png");
            $('#1' + i +'').html(randomFlag.flagName);
            currentAnswers.push(randomFlag);
        } else {
            currentAnswers.push(correctAnswer);
        }
    }
}
