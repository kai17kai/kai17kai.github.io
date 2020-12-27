const canvas = document.getElementById("canvas");
canvas.height = 200;
canvas.width = 300;
const context = canvas.getContext("2d");

//set color
context.fillStyle = "rgb(255, 255, 255)";

function clear() {
    let temp = context.fillStyle;
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = temp;
}

clear();

//Position of the Player
var HumanX = 250, HumanY = 150;

//Draws Human
context.fillRect(HumanX, HumanY, 20, 20);

//Draws THE WALL
context.fillRect(0, 0, 40, canvas.height);

var Score = 0;

function Reaction() {
    HumanX = 250;
    HumanY = 150;
    Score += 1;
    document.getElementById("p").innerHTML = "You Have Hit The Wall " + String(Score) + " Times";
}

function Movement(e) {
    if (e.key === "w") {
        HumanY -= 10;
        if (HumanY <= 0) {
            HumanY += 10;
        }
    } else if (e.key === "s") {
        HumanY += 10;
        if (HumanY >= 190) {
            HumanY -= 10;
        }
    } else if (e.key === "d") {
        HumanX += 10;
        if (HumanX >= 290) {
            HumanX -= 10;
        }
    } else if (e.key === "a") {
        HumanX -= 10;
        if (HumanX < -10) {
            HumanX += 10;
        }
    }

    clear();

    if (HumanX <= 40) {
        Reaction();
    }

    //Draws Human
    context.fillRect(HumanX, HumanY, 20, 20);

    //Draws THE WALL
    context.fillRect(0, 0, 40, canvas.height);
}

document.addEventListener("keydown", Movement);