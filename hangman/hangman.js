"use strict";

const canvas = document.getElementById("canvas");
canvas.height = 200;
canvas.width = 300;
const context = canvas.getContext("2d");

//Creates arrays that holds the word list, right guess, and wrong guess
var WordList = ["because", "world", "school", "schools", "military", "python", "text", "programming", "program"];
var RightGuess = new Array();
var WrongGuess = new Array();

Array.prototype.sample = function() {
    return this[Math.floor(Math.random() * 9)];
}

var Word = WordList.sample;