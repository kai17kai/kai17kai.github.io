"use strict";

function Ready() {
    document.getElementById("rules").style.display = "none";
    document.getElementById("game").style.display = "block";
    Start();
}

function Start() {
const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

context.fillStyle = "rgb(0, 0, 0)";
context.font = " 20px Arial";

let sectime = 0;
let timer = setInterval(() => {
    ++sectime;
    if (sectime === 300) {
        window.onkeypress = null;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillText("Time's up", 400, 300);
        clearInterval(timer);
    }
}, 1000);

//Creates arrays that holds the word list, right guess, and wrong guess
var WordList = ["because", "world", "school", "schools", "military", "python", "text", "programming", "program", "electric", "computers", "computer", "ball", "soccer", "smash", "board", "white", "black", "blackboard", "whiteboard", "aim", "alive", "all", "alcohol", "airport", "ahead", "afternoon", "afraid", "air", "agency", "agricultural", "mochi", "museum", "sad", "king", "echo", "little", "kiwi", "toast", "weather", "toaster", "the", "map", "gummy", "bear", "fox", "army", "beer", "shoe", "shoes", "shoot", "shooting"];
var RightGuess = [];
var WrongGuess = [];
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var NotOver = true;

//Word shit
var ChosenWord = WordList[Math.floor(Math.random() * WordList.length)];
var LinePositions = [];
var UsePositions = [];
let length = ChosenWord.length * 30;

for (let i = 0; i < ChosenWord.length; ++i) {
    LinePositions.push((400 - (length / 2)) + (i * 30))
}

//stit that helps set up
var NotDrawn = true;
var amount = 1;

//score
let score = 0;

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
            if (UsePositions.indexOf(LinePositions[i]) === -1) {
                context.fillText(ChosenWord[i], LinePositions[i] + 5, 350);
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
        context.fillText("You Have Lost To The Easiest Game Ever.", 220, 400);
        let phrase = "The Word was: " + ChosenWord;
        context.fillText(phrase, 400 - (phrase.length * 5), 450);
        context.fillText("Press y to restart", 310, 500);
        NotOver = false;
        window.addEventListener("keydown", (e) => {
            if (e.key == "y" || e.key == "Y") {
                window.location.reload();
            }
        });
    }
}

DisplayShit();

var Game = (e) => {
    if (NotOver) {
        let letter = String(e.key).toLowerCase();
        let i = ChosenWord.indexOf(letter);

        if (alphabet.indexOf(letter) > -1) {
            if (i >= 0) {
                RightGuess.push(letter);
            } else {
                if (WrongGuess.indexOf(letter) == -1) {
                    WrongGuess.push(letter);
                }
            }
        }

        console.log(RightGuess);
        console.log(WrongGuess);
        DisplayShit();
        document.getElementById("list").innerHTML = WrongGuess.join(", ");

        if (LinePositions.length == UsePositions.length) {
            context.fillText("You Have Won The Game. Press y to restart the game", 180, 400);
            NotOver = false;
            window.onkeypress = (e) => {
                if (e.key == "y" || e.key == "Y") {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    NotOver = true;
                    NotDrawn = true;
                    UsePositions = [];
                    UsePositions.length = 0;
                    LinePositions = [];
                    LinePositions.length = 0;
                    RightGuess = [];
                    RightGuess.length = 0;
                    WrongGuess = [];
                    WrongGuess.length = 0;
                    ChosenWord = WordList[Math.floor(Math.random() * WordList.length)];
                    let length = ChosenWord.length * 30;
                    for (let i = 0; i < ChosenWord.length; ++i) {
                        LinePositions.push((400 - (length / 2)) + (i * 30));
                    }
                    score += 1;
                    document.getElementById("score").innerHTML = "Score: " + String(score);
                    DisplayShit();
                    window.onkeypress = Game;
                }
            };
        }
    }
}

window.onkeypress = Game;
}
