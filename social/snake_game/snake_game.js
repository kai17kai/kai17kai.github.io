"use strict";

function MoveUp() {
    up = false, down = false, right = false, left = false;
    up = true;
}

function MoveDown() {
    up = false, down = false, right = false, left = false;
    down = true;
}

function MoveRight() {
    up = false, down = false, right = false, left = false;
    right=true;
}

function MoveLeft() {
    up = false, down = false, right = false, left = false;
    left=true;
}

let time = setInterval(()=>{
    if (localStorage.timer) {
        localStorage.timer = Number(localStorage.timer)+1;
    } else {
        localStorage.timer = 0;
    }
    console.log(Number(localStorage.timer));
    if (Number(localStorage.timer) >= 300) {
        clear();
        context.fillStyle = "white";
        context.font = "40px Arial";
        context.fillText("Time is up", 400, 300);
        window.onkeydown = null;
        clearInterval(time);
        clearInterval(game);
    }
}, 1000);

const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

let snake_x = [];
snake_x.push(Math.floor(Math.random() * 30) * 20);
let snake_y = [];
snake_y.push(Math.floor(Math.random() * 30) * 20);

let score = 0;

let food = {
    x: Math.floor(Math.random() * 40) * 20,
    y: Math.floor(Math.random() * 30) * 20
}

let movement = null;
let up = false, down = false, right = false, left = false;
window.onkeydown = (e) => {
    if ((e.key === "w" || e.key  === "ArrowUp") && down === false) {
        up = false, down = false, right = false, left = false;
        up = true;
    } else if ((e.key === "s" || e.key === "ArrowDown") && up === false) {
        up = false, down = false, right = false, left = false;
        down = true;
    } else if ((e.key === "d" || e.key === "ArrowRight") && left === false) {
        up = false, down = false, right = false, left = false;
        right=true;
    } else if ((e.key === "a" || e.key === "ArrowLeft") && right === false) {
        up = false, down = false, right = false, left = false;
        left=true;
    }
}

let game = setInterval(() => {
    document.getElementById("length").innerHTML = `Score: ${score}`;
    let distance = Math.sqrt(Math.pow(snake_x[0] - food.x, 2) + Math.pow(snake_y[0] - food.y, 2));
    if (distance <= 20) {
        for (let i = 0; i < 2; ++i) {
            snake_x.push(food.x);
            snake_y.push(food.y);
        }
        food.x = Math.floor(Math.random() * 40) * 20;
        food.y = Math.floor(Math.random() * 30) * 20;
        ++score;
    }
    if (up) {
        snake_y.unshift(snake_y[0] - 10);
        snake_x.unshift(snake_x[0]);
        snake_y.pop();
        snake_x.pop();
    } else if (down) {
        snake_y.unshift(snake_y[0] + 10);
        snake_x.unshift(snake_x[0]);
        snake_x.pop();
        snake_y.pop();
    } else if (right) {
        snake_x.unshift(snake_x[0] + 10);
        snake_y.unshift(snake_y[0]);
        snake_x.pop();
        snake_y.pop();
    } else if (left) {
        snake_x.unshift(snake_x[0] - 10);
        snake_y.unshift(snake_y[0]);
        snake_x.pop();
        snake_y.pop();
    }
    for (let i = 0; i < snake_x.length; ++i) {
        if (snake_x[i] <= -20) {
            snake_x[i] = 800;
        } else if (snake_x[i] >= 800) {
            snake_x[i] = 0;
        } else if (snake_y[i] <= -20) {
            snake_y[i] = 580;
        } else if (snake_y[i] >= 600) {
            snake_y[i] = 0;
        }
    }

    clear();
    context.fillStyle = "rgb(0,255,0)";
    for (let i = 0; i < snake_x.length; ++i) {
        context.fillRect(snake_x[i], snake_y[i], 20, 20);
    }

    context.fillStyle = "rgb(255, 0, 0)";
    context.fillRect(food.x, food.y, 20, 20);

    for (let i = 1; i < snake_x.length; ++i) {
        let distance = Math.sqrt(Math.pow(snake_x[0] - snake_x[i], 2) + Math.pow(snake_y[0] - snake_y[i], 2)) + 10;
        if (distance < 20) {
            console.log(distance);
            console.log(i);
            context.font = "40px Arial";
            context.fillStyle = "white";
            context.fillText("You Have Died", 400, 300);
            window.onkeydown = null;
            localStorage.timer = 300;
            clearInterval(game);
            clearInterval(time);
        }
    }
}, 45);

function clear() {
    let temp = context.fillStyle;
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = temp;
}