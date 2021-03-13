"use strict";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

var board = new Array(15);

for (let i = 0; i < board.length; ++i) {
    board[i] = new Array(10);
    for (let j = 0; j < board[i].length; ++j) {
        board[i][j] = 0;
    }
}

let test = new Blocks, down = false, right = false, left = false;
test.Draw();
window.onkeydown = (e) => {
    if (e.key === "d" || e.key === "ArrowRight") {
        right = true;
    } else if (e.key === "s" || e.key === "ArrowDown") {
        down = true;
    } else if (e.key === "a" || e.key === "ArrowLeft") {
        left = true;
    }
}
let choice = Math.floor(Math.random() * 5);
test.AddBlock(choice);
let timer = 0;
let auto = setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ++timer;
    test.MoveDown(1);
    test.Draw();
    test.Check();
}, 1000);
let user = setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (right) {
        test.MoveRight();
    } else if (down) {
        test.MoveDown();
    } else if (left) {
        test.MoveLeft();
    }
    test.Draw();
    test.Check();
    down = false, right = false, left = false;
}, 50);