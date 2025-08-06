"use strict";

const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

context.fillStyle = "rgb(0, 0, 0)";
context.font = " 20px Arial";

//Creates arrays that holds the word list, right guess, and wrong guess
var WordList
fetch("./words_alpha.txt")
    .then((res) => res.text())
    .then(text => {
        console.log(text);
        WordList = text.split("\n");
        ChosenWord = WordList[Math.floor(Math.random() * WordList.length)];
        while (ChosenWord.length > 10) {
            ChosenWord = WordList[Math.floor(Math.random() * WordList.length)];
        }
        ChosenWord = ChosenWord.toString().substring(0, ChosenWord.toString().length - 2);
        start();
    })
    .catch(error => {
        console.error(error);
        WordList = ["midfield","prescribed","torches","visually","alright","trainer","disease","moderation","northern","village","substance","proponents","conversion","elapsed","betrayal","lectures","promoter","indictment","inflated","subsidiary","annoyed","accordingly","publish",
"unaware","dashing","republic","eyebrows","underground","helicopter","tagging","merging","feminist","assertion","scramble","southward","annoyed","bowling","perhaps","truckers","municipal","uncover","lectures","playback","displeasure","textbook","catering","shortfall",
"vacancies","proceeds","unbiased","Australia","torment","whenever","reservoir","sensory","candidates","northeastern","rousing","effectively","mouthed","defense","essentially","assumption","patrolling","medicines",
"trooper","considered","measurement","durable","solidly","circled","utterance","confusing","lurking","agreeable","ringing","dreamed","donation","desperation","severity","trustee","fatalities","financing","terrace",
"automaker","creators","expansive","whenever","projection","license","library","constraints","annoyed","comeback","thinner","unaware","unnecessarily","shortfall","suppression","provoke","safeguard","personally","exhaustive","delegates","undertaking","homemade","prisons",
,"handling","lectures","whisper","uncover","southwest","undecided","applicable","royalty","proponents","pitched","Frankenstein","vacancies","guitars","mountainous","spouses","Salisbury","deliberately","advantages","royalties","avoidance","precipitation","violently","Bulgaria",
"patrons","inviting","commentaries","greener","breathless","ammunition","required","horrors","touchdown","parliament","notebook","duration","inspect","blossom","baskets","brushed","telecoms","baptized","purchasing","unqualified","constituted","destruction","bonding","slaughter"];
        ChosenWord = WordList[Math.floor(Math.random() * WordList.length)];
        start();
    });
var alphabet = "abcdefghijklemnopqrstuvwxyz";
var RightGuess = new Array();
var WrongGuess = new Array();
var NotOver = true;
var ChosenWord;
function start() {
    var LinePositions = [];
    var UsePositions = [];

    var length = ChosenWord.length;

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
            let letter = String(e.key).toLowerCase();

            if (alphabet.includes(letter)) {
                if (ChosenWord.includes(letter)) {
                    RightGuess.push(letter);
                } else if(!(WrongGuess.includes(letter))){
                    WrongGuess.push(letter);
                }
            }

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
