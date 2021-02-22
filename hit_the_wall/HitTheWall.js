const canvas = document.getElementById("canvas");
canvas.height = 200;
canvas.width = 300;
const context = canvas.getContext("2d");

//set color
context.fillStyle = "rgb(255, 255, 255)";

//Position and Movement of the Player
var HumanX = 250, HumanY = 150, Up = false, Down = false, Right = false, Left = false;

//Draws Human
context.fillRect(HumanX, HumanY, 20, 20);

//Draws THE WALL
context.fillRect(0, 0, 40, canvas.height);

var Score = 0;

function Reaction() {
    HumanX += 210;
    Score += 1;
    document.getElementById("p").innerHTML = "You Have Hit The Wall " + String(Score) + " Times";
}

function Movement(e) {
    if (e.key === "w" || e.key === "ArrowUp") {
        Up = true;
    } else if (e.key === "s" || e.key === "ArrowDown") {
        Down = true;
    } else if (e.key === "d" || e.key === "ArrowRight") {
        Right = true;
    } else if (e.key === "a" || e.key === "ArrowLeft") {
        Left = true;
    }
}

document.addEventListener("keydown", Movement);
document.onkeyup = (e) => {
    if (e.key === "w" || e.key === "ArrowUp") {
        Up = false;
    } else if (e.key === "s" || e.key === "ArrowDown") {
        Down = false;
    } else if (e.key === "d" || e.key === "ArrowRight") {
        Right = false;
    } else if (e.key === "a" || e.key === "ArrowLeft") {
        Left = false;
    }
}

setInterval(() => {
    let temp = context.fillStyle;
    context.fillStyle = "black";
    context.fillRect(HumanX, HumanY, 20, 20);
    context.fillStyle = temp;
    if (Up) {
        HumanY -= 10;
        if (HumanY <= -10) {
            HumanY += 10;
        }
    }
    if (Down) {
        HumanY += 10;
        if (HumanY >= 190) {
            HumanY -= 10;
        }
    }
    if (Right) {
        HumanX += 10;
        if (HumanX >= 290) {
            HumanX -= 10;
        }
    }
    if (Left) {
        HumanX -= 10;
        if (HumanX < -10) {
            HumanX += 10;
        }
    }
    let distance = Math.sqrt(Math.pow(HumanX - 0, 2) + Math.pow(HumanY - HumanY, 2));

    if (distance <= 30) {
        Reaction();
    }

    //Draws Human
    context.fillRect(HumanX, HumanY, 20, 20);
}, 40);