"use strict";

const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

context.fillStyle = "rgb(0, 0, 0)";
context.font = " 20px Arial";

//Creates arrays that holds the word list, right guess, and wrong guess
var WordList = ["because", "world", "school", "schools", "military", "python", "text", "programming", "program", "electric", "computers", "computer", "ball", "soccer", "smash", "board", "white", "black", "blackboard", "whiteboard", "aim", "alive", "all", "alcohol", "airport", "ahead", "afternoon", "afriad", "air", "agency", "agricultural", "mochi", "museum", "sad", "king", "echo", "little", "kiwi", "toast", "weather", "toaster", "the", "map", "gummy", "bear", "fox", "army"];
var RightGuess = new Array();
var WrongGuess = new Array();

var ChosenWord = WordList[Math.floor(Math.random() * WordList.length)];

var LinePositions = new Array();
var UsePositions = new Array();

for (let i = 0; i < ChosenWord.length; ++i) {
    LinePositions.push(400 + (i * 30));
}

var NotDrawn = true;

function DisplayShit() {
    if (NotDrawn) {
        context.moveTo(360, 300);
        context.lineTo(440, 300);
        context.moveTo(400, 300);
        context.lineTo(400, 200);
        context.lineTo(440, 200);
        context.lineTo(440, 210);
        context.stroke();
        NotDrawn = false;
    }

    for (let i = 0; i < ChosenWord.length; i++) {
        context.moveTo(LinePositions[i], 350);
        if (RightGuess.indexOf(ChosenWord[i]) > -1) {
            if (UsePositions.length <= 0 || UsePositions.indexOf(LinePositions[i]) === -1) {
                context.fillText(ChosenWord[i], LinePositions[i], 350);
                UsePositions.push(LinePositions[i]);
            }
        }
        context.fillRect(LinePositions[i],350, 20, 1);
    }

    if (WrongGuess.length == 1) {
        context.beginPath();
        context.arc(440, 220, 10, 0,2*Math.PI,false);
        context.closePath();
        context.stroke();
    }
    if (WrongGuess.length == 2) {
        context.fillRect(440, 230, 1, 30);
    }
    if (WrongGuess.length == 3) {
        context.fillRect(420, 240, 40, 1);
    }
    if (WrongGuess.length == 4) {
        context.moveTo(440, 260);
        context.lineTo(450, 270);
        context.stroke();
    }
    if (WrongGuess.length == 5) {
        context.moveTo(440, 260);
        context.lineTo(430, 270);
        context.stroke();
        setTimeout(function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillText("You Have Lost To The Easiest Game Ever.", 300, 300);
            document.removeEventListener("keydown", Game);
        }, 2000)
    }
}

DisplayShit();

document.addEventListener("keydown", Game);

function Game(e) {
    let i = ChosenWord.indexOf(e.key);
    if (i >= 0) {
        RightGuess.push(e.key);
    } else {
        WrongGuess.push(e.key);
    }
    console.log(RightGuess);
    console.log(WrongGuess);
    DisplayShit();
    let l = WrongGuess.join(", ");
    document.getElementById("list").innerHTML = l;
}
