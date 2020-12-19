const canvas = document.querySelector("#canvas");
canvas.height = 600; // pick whatever dimensions fit on your screen
canvas.width = 800;
const context = canvas.getContext("2d");

//clears canvas
function clear(){
    let temp = context.fillStyle;
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0,0, canvas.width, canvas.height);
    context.fillStyle = temp;
}

clear();

context.fillStyle = "rgb(255, 255, 255)"
context.fillRect(10, 10, 10, 10);
var BallPosition = [100, 10];
context.fillRect(400, 500, 50, 10)

var HumanX = 400;
function Movement(e) {
    if (e.key === "d") {
        HumanX += 10;
        if (HumanX === 800) {
            HumanX -= 10;
        }
    } else if (e.key === "a") {
        HumanX -= 10;
        if (HumanX === 0) {
            HumanX += 10
        }
    }

    console.log(String(HumanX))
}

function Visibility() {
    clear();
    context.fillRect(HumanX, 500, 60, 10);
    context.fillRect(BallPosition[0], BallPosition[1], 10, 10)
}

var Up, Down = true, Left, Right;

function BallMovement() {
    if (Up === true) {
        BallPosition[1] -= 10;
        if (BallPosition[1] === 0) {
            Up = false;
            Down = true;
        }
    }
    if (Down === true) {
        BallPosition[1] += 10;
        if (BallPosition[1] === 500 && BallPosition[0] >= HumanX && BallPosition[0] <= HumanX + 50) {
            Down = false;
            Up = true;
        }
    }
    if (Left === true) {
        BallPosition[0] -= 10;
    }
    if (Right === true) {
        BallPosition[0] += 10;
    }
}

document.addEventListener("keydown", Movement);
var BallVisibility = setInterval(Visibility, 1);
var Ball = setInterval(BallMovement, 100);

