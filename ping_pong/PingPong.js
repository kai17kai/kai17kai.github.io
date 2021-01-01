const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

//set color
context.fillStyle = "rgb(255, 255, 255)";

function clear() {
    let temp = context.fillStyle;
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = temp;
}

function Reverse(number) {
    return (-number);
}

//Position of the boards and ball
var Human = 270, Computer = 270, BallX = 390, BallY = 290;

function HumanMovement(e) {
    if (e.key === "w") {
        Human -= 20;
        if (Human <= 0) {
            Human += 20;
        }
    } else if (e.key === "s") {
        Human += 20;
        if (Human >= 550) {
            Human -= 20;
        }
    }
}

function Visibility() {
    clear()
    context.fillRect(20, Human, 10, 60);
    context.fillRect(770, Computer, 10, 60);
    context.fillRect(BallX, BallY, 20, 20);
}

//All the posible movements for the ball
var Down, Slope = {y1: 3, y2: 5, x:10}, Choice = Math.floor(Math.random() * 2) + 1, y1, y2;

//Slope Choice
if (Choice === 1) {
    y1 = true;
} else if (Choice === 2) {
    y2 = true;
}

//Up or down
Choice = Math.floor(Math.random() * 2);
if (Choice === 0) {
    Down = true;
} else {
    Down === false;
}

Slope.x = Reverse(Slope.x);


function BallMovement() {
    BallX += Slope.x;
    if (Down === true) {
        if (y1 === true) {
            BallY += Slope.y1;
        } else if (y2 === true) {
            BallY += Slope.y2;
        }
    } else {
        if (y1 === true) {
            BallY -= Slope.y1;
        } else if (y2 === true) {
            BallY -= Slope.y2;
        }
    }

    //Checks if the ball is at the top or bottom
    if (BallY <= 0) {
        Down = true
    } else if (BallY >= 580) {
        Down = false;
    }

    //Checks if the ball is at the edge of the map on both sides
    if (BallX <= 0 || BallX >= 800) {
        IsDead();
    }

    //Checks if the ball is hitting the Human or Computer board and chooses what the reaction will be
    if ((BallY >= Human || BallY >= Computer) && (BallY <= Human + 60 || BallY <= Computer + 60) && (BallX <= 40 || BallX >= 780) && (BallX >= 30 || BallX <= 770)) {
        Slope.x = Reverse(Slope.x);
    }

    if (BallX <= 780) {
        Computer = BallY - 25;
    }
}

document.addEventListener("keydown", HumanMovement);
var Visibility = setInterval(Visibility, 1);
var BallMovement = setInterval(BallMovement, 45);

function IsDead() {
    clearInterval(Visibility);
    clearInterval(BallMovement);
    clear();
    context.font = "40px Arial";
    context.fillText("You Died", 380, 280);
}