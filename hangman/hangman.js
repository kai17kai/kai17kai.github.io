"use strict";

const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

context.fillStyle = "rgb(0, 0, 0)";
context.font = " 20px Arial";

//Creates arrays that holds the word list, right guess, and wrong guess
var alphabet = "abcdefghijklemnopqrstuvwxyz";
var RightGuess = new Array();
var WrongGuess = new Array();
var NotOver = true;

var ChosenWord;
function Word() {
    $.getJSON("https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=-1&api_key=cfbdvci39k77upfq2dy0jidgnyumjnz98tx0n37716m8gbbgy", function(data) {
        ChosenWord = Array.from(data.word);
        ChosenWord.forEach(element => {
            if (!(alphabet.includes(element))) {
                Word();
            }
        });
        start();
    });
}
Word();
function start() {
    //var ChosenWord = WordList[Math.floor(Math.random() * WordList.length)];

    var LinePositions = [];
    var UsePositions = [];

    var length = ChosenWord.length;
    console.log(length);

    for (let i = 0; i < ChosenWord.length; ++i) {
        LinePositions.push((400 - (length * 30 / 2)) + (i * 30))
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
            let letter = String(e.key);
            let i = ChosenWord.indexOf(letter);

            if (i >= 0) {
                RightGuess.push(letter);
            } else {
                WrongGuess.push(letter);
            }

            console.log(RightGuess);
            console.log(WrongGuess);
            DisplayShit();
            document.getElementById("list").innerHTML = WrongGuess.join(", ");

            if (LinePositions.length == UsePositions.length) {
                context.fillText("You Have Won The Game. Press y to restart the game", 180, 400);
                NotOver = false;
                window.addEventListener("keydown", (e) => {
                    if (e.key == "y" || e.key == "Y") {
                        window.location.reload();
                    }
                });
            }
        }
    }

    window.addEventListener("keypress", Game);
}