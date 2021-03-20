"use strict";

if (localStorage.minTime) {
    document.getElementById("game").style.display = "block";
    document.getElementById("rules").style.display = "none";
    if (Number(localStorage.secTime) >= 10) {
        document.getElementById("timer").innerHTML = String(localStorage.minTime) + ":" + String(localStorage.secTime);
    } else {
        document.getElementById("timer").innerHTML = String(localStorage.minTime) + ":0" + String(localStorage.secTime);
    }
    Start();
}

function x() {
document.getElementById("game").style.display = "block";
document.getElementById("rules").style.display = "none";
Start();
}

function Start() {
const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

context.fillStyle = "rgb(0, 0, 0)";
context.font = " 20px Arial";

//Creates arrays that holds the word list, right guess, and wrong guess
var WordList = ["midfield","prescribed","torches","visually","alright","trainer","disease","moderation","northern","village","substance","proponents","conversion","elapsed","betrayal","lectures","promoter","indictment","inflated","subsidiary","annoyed","accordingly","publish",
"unaware","dashing","Hawthorne","republic","Colombian","eyebrows","underground","Einstein","helicopter","tagging","merging","feminist","assertion","scramble","southward","annoyed","bowling","perhaps","truckers","municipal","uncover","lectures","Nintendo","playback","displeasure","textbook","Nielsen","catering","shortfall",
"vacancies","proceeds","Virginia","unbiased","Australia","torment","whenever","reservoir","sensory","candidates","northeastern","rousing","effectively","mouthed","defense","essentially","assumption","patrolling","medicines",
"trooper","considered","measurement","durable","solidly","circled","utterance","confusing","lurking","agreeable","ringing","dreamed","donation","desperation","severity","trustee","fatalities","financing","terrace",
"automaker","creators","expansive","whenever","projection","license","Finnish","library","constraints","annoyed","Pyongyang","comeback","thinner","unaware","unnecessarily","shortfall","suppression","provoke","safeguard","personally","exhaustive","delegates","undertaking","homemade","prisons","Ibrahim",
"Islanders","handling","lectures","whisper","uncover","Pasadena","southwest","undecided","applicable","royalty","proponents","pitched","Frankenstein","vacancies","guitars","mountainous","spouses","Salisbury","deliberately","advantages","royalties","avoidance","precipitation","Houghton","violently","Bulgaria",
"patrons","inviting","commentaries","greener","breathless","ammunition","required","horrors","touchdown","parliament","notebook","duration","inspect","blossom","Ethernet","baskets","brushed","telecoms","baptized","purchasing","unqualified","constituted","destruction","bonding","slaughter"];
var alphabet = "abcdefghijklemnopqrstuvwxyz";
var RightGuess = new Array();
var WrongGuess = new Array();
var NotOver = true;
var ChosenWord;

function Word() {
    $.getJSON("https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun%2Cadjective%2Cverb%2Cadverb&minCorpusCount=20000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=7&maxLength=16&limit=1&api_key=cfbdvci39k77upfq2dy0jidgnyumjnz98tx0n37716m8gbbgy", function(data) {
        let done = false;
        ChosenWord = Array.from(data[0].word);
        ChosenWord.forEach(element => {
            if (!(alphabet.includes(element))) {
                done = true;
            }
        });
        console.log(ChosenWord);
        if (!(done)) {
            start();
        } else {
            Word();
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        ChosenWord = WordList[Math.floor(Math.random() * WordList.length)];
        start();
    });
}
Word();

function start() {
var LinePositions = new Array();
var UsePositions = new Array();

const length = ChosenWord.length * 30;

for (let i = 0; i < ChosenWord.length; ++i) {
    LinePositions.push((400 - (length / 2)) + (i * 30))
}

if (localStorage.score) {
    document.getElementById("score").innerHTML = "Score: " + localStorage.score;
} else {
    localStorage.score = 0;
    document.getElementById("score").innerHTML = "Score: 0";
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

    if (WrongGuess.length / 2 == 1) {
        context.beginPath();
        context.arc(440, 220, 10, 0,2*Math.PI,false);
        context.closePath();
        context.stroke();
    }
    if (WrongGuess.length / 2 == 2) {
        context.fillRect(440, 230, 1, 30);
    }
    if (WrongGuess.length / 2 == 3) {
        context.fillRect(420, 240, 40, 1);
    }
    if (WrongGuess.length / 2 == 4) {
        context.moveTo(440, 260);
        context.lineTo(450, 270);
        context.stroke();
    }
    if (WrongGuess.length / 2 == 5) {
        context.moveTo(440, 260);
        context.lineTo(430, 270);
        context.stroke();
        context.fillText("You Have Lost To The Easiest Game Ever.", 220, 400);
        let phrase = "The Word was: " + ChosenWord.join("");
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

        if (alphabet.includes(letter)) {
            if (ChosenWord.includes(letter)) {
                RightGuess.push(letter);
            } else {
                letter = letter.toUpperCase();
                if (ChosenWord.includes(letter)) {
                    RightGuess.push(letter);
                } else if (!(WrongGuess.includes(letter))) {
                    WrongGuess.push(letter.toUpperCase());
                    WrongGuess.push(letter.toLowerCase());
                }
            }
        }

        DisplayShit();
        document.getElementById("list").innerHTML = WrongGuess.join(", ");

        if (LinePositions.length == UsePositions.length) {
            context.fillText("You Have Won The Game. Press y to restart the game", 180, 400);
            NotOver = false;
            localStorage.score = Number(localStorage.score)+1;
            document.getElementById("score").innerHTML = "Score: " + localStorage.score;
            window.addEventListener("keydown", (e) => {
                if (e.key == "y" || e.key == "Y") {
                    window.location.reload();
                }
            });
        }
    }
}

window.addEventListener("keypress", Game);

let time = setInterval(() => {
    if (Number(localStorage.minTime) >= 5) {
        NotOver = false;
        context.fillText("Time is Up", 1800, 400);
        clearInterval(time);
    }
    if (localStorage.secTime && localStorage.minTime) {
        localStorage.secTime = Number(localStorage.secTime)+1;
    } else {
        localStorage.secTime = 0;
        localStorage.minTime = 0;
    }
    if (localStorage.secTime > 59) {
        localStorage.secTime = 0;
        localStorage.minTime = Number(localStorage.minTime)+1;
    }
    if (Number(localStorage.secTime) >= 10) {
        document.getElementById("timer").innerHTML = String(localStorage.minTime) + ":" + String(localStorage.secTime);
    } else {
        document.getElementById("timer").innerHTML = String(localStorage.minTime) + ":0" + String(localStorage.secTime);
    }

    console.log(localStorage.secTime);
    console.log(localStorage.minTime);
}, 1000);
}
}
