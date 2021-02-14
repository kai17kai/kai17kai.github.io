"use strict";

var gamepad = false;

window.addEventListener("gamepadconnected", function(e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
    console.log(gamepad);
    let gp = navigator.getGamepads()[0];
    console.log(gp);
    gamepad = true;
});

let controls = setInterval(() => {
    if (gamepad) {
        let gp = navigator.getGamepads()[0];
        if (gp.buttons[0].pressed || gp.buttons[13].pressed || gp.axes[1] >= 0.75 || gp.axes[3] >= 0.75) {
            if (up === false) {
                up = false, down = false, right = false, left = false;
                down = true;
            }
        } else if (gp.buttons[1].pressed || gp.buttons[15].pressed || gp.axes[0] >= 0.75 || gp.axes[2] >= 0.75) {
            if (left === false) {
                up = false, down = false, right = false, left = false;
                right=true;
            }
        } else if (gp.buttons[2].pressed || gp.buttons[14].pressed || gp.axes[0] <= -0.75 || gp.axes[2] <= -0.75) {
            if (right === false) {
                up = false, down = false, right = false, left = false;
                left=true;
            }
        } else if (gp.buttons[3].pressed || gp.buttons[12].pressed || gp.axes[1] <= -0.75 || gp.axes[3] <= -0.75) {
            if (down === false) {
                up = false, down = false, right = false, left = false;
                up = true;
            }
        }
    }
}, 1);

window.ongamepaddisconnected = () => {
    console.log("Controller disconnected");
}

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
    if (!(localStorage.dead)) {
        localStorage.dead = false;
        Start();
    } else {
        if (Boolean(localStorage.dead)) {
            clear();
            context.fillStyle = "white";
            context.font = "40px Arial";
            context.fillText("You Died", 400, 300);
            document.getElementById("timer").innerHTML = "Timer: 0:00";
            window.onkeydown = null;
        } else {
            Start();
        }
    }
    
}

let up = false, down = false, right = false, left = false;

function Start() {

    document.getElementById("rules").style.display = "none";
    document.getElementById("game").style.display = "block";

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
        if (speed > 5) {
            --amount;
            if (amount === 0) {
                amount = 3;
                speed -= 1;
                clearInterval(game);
                game = setInterval(d, speed);
                console.log(speed)
            }
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
            localStorage.dead = true;
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