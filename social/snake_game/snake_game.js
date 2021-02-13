"use strict";

document.getElementById("1").onclick = () => {
    if (down === false) {
        up = false, down = false, right = false, left = false;
        up = true;
    }
}

document.getElementById("4").onclick = () => {
    if (up === false) {
        up = false, down = false, right = false, left = false;
        down = true;
    }
}

document.getElementById("3").onclick = () => {
    if (left === false) {
        up = false, down = false, right = false, left = false;
        right=true;
    }
}

document.getElementById("2").onclick = () => {
    if (right === false) {
        up = false, down = false, right = false, left = false;
        left=true;
    }
}

const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

function x() {
    document.getElementById("rules").style.display = "none";
    document.getElementById("game").style.display = "block";
    if (!(localStorage.mintimer) || !(localStorage.sectimer)) {
        localStorage.mintimer = 5;
        localStorage.sectimer = 0;
        Start();
    } else {
        if (Number(localStorage.mintimer) <= 0 && Number(localStorage.sectimer) <= 0) {
            clear();
            context.fillStyle = "white";
            context.font = "40px Arial";
            context.fillText("Time is up", 400, 300);
            document.getElementById("timer").innerHTML = "Timer: 0:00";
            window.onkeydown = null;
        } else {
            if (Number(localStorage.sectimer) >= 10) {
                document.getElementById("timer").innerHTML = "Timer: " + localStorage.mintimer + ":" + localStorage.sectimer;
            } else {
                document.getElementById("timer").innerHTML = "Timer: " + localStorage.mintimer + ":0" + localStorage.sectimer;
            }
            Start();
        }
    }
    
}

let up = false, down = false, right = false, left = false;

function Start() {

    document.getElementById("rules").style.display = "none";
    document.getElementById("game").style.display = "block";

let time = setInterval(()=>{
        if (Number(localStorage.mintimer) <= 0 && Number(localStorage.sectimer) <= 0) {
            clear();
            context.fillStyle = "white";
            context.font = "40px Arial";
            context.fillText("Time is up", 400, 300);
            window.onkeydown = null;
            clearInterval(time);
            clearInterval(game);
        } else {
        if (localStorage.sectimer) {
            if (localStorage.sectimer > 0) {
                localStorage.sectimer = Number(localStorage.sectimer)-1;
            } else {
                localStorage.sectimer = Number(59);
                localStorage.mintimer = Number(localStorage.mintimer)-1;
            }
        }

        if (Number(localStorage.sectimer) >= 10) {
            document.getElementById("timer").innerHTML = "Timer: " + localStorage.mintimer + ":" + localStorage.sectimer;
        } else {
            document.getElementById("timer").innerHTML = "Timer: " + localStorage.mintimer + ":0" + localStorage.sectimer;
        }

        console.log(localStorage.sectimer);
        console.log(localStorage.mintimer);
    }
}, 1000);

let snake_x = [];
snake_x.push(Math.floor(Math.random() * 30) * 20);
let snake_y = [];
snake_y.push(Math.floor(Math.random() * 30) * 20);

let score = 0;

let food = {
    x: Math.floor(Math.random() * 40) * 20,
    y: Math.floor(Math.random() * 30) * 20
}

window.onkeydown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
    }
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

let amount = 3, speed = 45;
let game = setInterval(d, speed);

function d() {
    document.getElementById("length").innerHTML = `Score: ${score}`;
    let distance = Math.sqrt(Math.pow(snake_x[0] - food.x, 2) + Math.pow(snake_y[0] - food.y, 2));
    if (distance <= 20) {
        for (let i = 0; i < 2; ++i) {
            snake_x.push(snake_x[0]);
            snake_y.push(snake_y[0]);
        }
        food.x = Math.floor(Math.random() * 40) * 20;
        food.y = Math.floor(Math.random() * 30) * 20;
        ++score;
        --amount;
        if (amount == 0) {
            amount = 3;
            --speed;
            clearInterval(game);
            game = setInterval(d, speed);
        }
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
            localStorage.mintimer = 0;
            localStorage.sectimer = 0;
            clearInterval(game);
            clearInterval(time);
        }
    }
}
}

function clear() {
    let temp = context.fillStyle;
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = temp;
}