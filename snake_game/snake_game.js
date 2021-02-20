"use strict";

function preventDefault(e){
    if (!(clicked)) {
        e.preventDefault();
    }
}
document.body.addEventListener('touchmove', preventDefault, { passive: false });

function Game() {
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

function highScore(score) {
    var saved = 0;
    try { saved = parseFloat(localStorage.snakehighScore); } catch (e) { saved = 0; }
    if (!(typeof score === 'undefined')) {
       try { score = parseFloat(score); } catch (e) { score = 0; }
       if (score>saved) {
         saved = score;
         localStorage.snakehighScore = '' + score;
       }
    }
    if (isNaN(saved)) {
       saved = 0;
       localStorage.snakehighScore = '0';
    }
    return saved;
 }

 document.getElementById("high").innerHTML = "HighScore: " + highScore(0);

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
        } else if (gp.buttons[9].pressed) {
            window.location.reload();
        } else if (gp.buttons[16].pressed) {
            document.getElementById("back").click();
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
let square_side = Math.min(window.innerWidth, window.innerHeight) - 150;
square_side -= square_side%8;
canvas.setAttribute('width', square_side.toString()); 
canvas.setAttribute('height',square_side.toString());
const context = canvas.getContext("2d");

let snake_x = [];
snake_x.push(Math.floor(Math.random() * (canvas.width + 1)));
let snake_y = [];
snake_y.push(Math.floor(Math.random() * canvas.height + 1));

let score = 0;

let food = {
    x: Math.floor(Math.random() * (canvas.width + 1 - 20)),
    y: Math.floor(Math.random() * (canvas.height + 1 - 20))
}
let x = Math.floor(Math.random() * canvas.width + 1), y = Math.floor(Math.random() * canvas.height + 1);
for (let i = 0; i < snake_y.length; ++i) {
    let distance = Math.sqrt(Math.pow(x - snake_y[i], 2) + Math.pow(y - snake_y[i], 2));
    if (distance < 100) {
        x = Math.floor(Math.random() * (canvas.width + 1 - 20)), y = Math.floor(Math.random() * (canvas.height + 1 - 20));
        distance = Math.sqrt(Math.pow(food.x - snake_y, 2) + Math.pow(food.y - snake_y, 2));
        i = -1;
    }
}
food.x = x;
food.y = y;

let up = false, down = false, right = false, left = false;
window.onkeydown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "ArrowLeft") {
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

let amount = 5, speed = 45;
let game = setInterval(d, speed);

function d() {
    let distance = Math.sqrt(Math.pow(snake_x[0] - food.x, 2) + Math.pow(snake_y[0] - food.y, 2));
    if (distance <= 20) {
        for (let i = 0; i < 2; ++i) {
            snake_x.push(snake_x[0]);
            snake_y.push(snake_y[0]);
        }
        let x = Math.floor(Math.random() * canvas.width + 1), y = Math.floor(Math.random() * canvas.height + 1);
        for (let i = 0; i < snake_y.length; ++i) {
            let distance = Math.sqrt(Math.pow(x - snake_y[i], 2) + Math.pow(y - snake_y[i], 2));
            if (distance < 100) {
                x = Math.floor(Math.random() * (canvas.width + 1 - 20)), y = Math.floor(Math.random() * (canvas.height + 1 - 20));
                distance = Math.sqrt(Math.pow(food.x - snake_y, 2) + Math.pow(food.y - snake_y, 2));
                i = -1;
            }
        }
        food.x = x;
        food.y = y;
        ++score;
        document.getElementById("length").innerHTML = `Score: ${score}`;
        document.getElementById("high").innerHTML = "HighScore: " + highScore(score);
        if (speed > 10) {
            --amount;
            if (amount === 0) {
                amount = 5;
                speed -= 1;
                clearInterval(game);
                game = setInterval(d, speed);
                console.log(speed)
            }
        } else {
            let audio = new Audio();
            audio.src = "audio.mp3"
            audio.play();
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
            snake_x[i] = canvas.width;
        } else if (snake_x[i] >= canvas.width) {
            snake_x[i] = 0;
        } else if (snake_y[i] <= -20) {
            snake_y[i] = canvas.height;
        } else if (snake_y[i] >= canvas.height) {
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
            context.fillText("You Have Died", canvas.width / 4, canvas.height / 2);
            clearInterval(game);
        }
    }
}

function clear() {
    let temp = context.fillStyle;
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = temp;
}

window.onresize = () => {
    let square_side = Math.min(window.innerWidth, window.innerHeight) - 150;
	square_side -= square_side%8;
    canvas.setAttribute('width', square_side.toString()); 
    canvas.setAttribute('height',square_side.toString());
    canvas.width = canvas.width; canvas.height = canvas.height;
    if (food.x + 20 > canvas.x && food.y + 20 > canvas.y) {
        food.x -= square_side;
        food.y -= square_side;
    }
}
}