const canvas = document.querySelector("#canvas");
canvas.height = 600; // pick whatever dimensions fit on your screen
canvas.width = 800;
const context = canvas.getContext("2d");

//Returns oposite value
function Reverse(number) {
    return (number * -1);
}

//clears canvas
function clear(){
    let temp = context.fillStyle;
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0,0, canvas.width, canvas.height);
    context.fillStyle = temp;
}

clear();

//Sets color white
context.fillStyle = "rgb(255, 255, 255)"

//Current ball position
var BallPosition = {x:100, y:10};

//Slope
var Slope = {
    y: 1,
    x: 10
}

//Creates board
context.fillRect(400, 500, 50, 10)

//Human Position
var HumanX = 400;

//Human Movement
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

//Visibility of the board and ball
function Visibility() {
    clear();
    context.fillRect(HumanX, 500, 60, 10);
    context.fillRect(BallPosition.x, BallPosition.y, 10, 10)
}

//Ball Movement
var Down = true;
function BallMovement() {
    if (Down === true) {
        BallPosition.x += Slope.x;
        BallPosition.y += Slope.y;
    } else {
        BallPosition.x -= Slope.x;
        BallPosition.y -= Slope.y;
    }

    if (BallPosition.x > 790 || BallPosition.x < 0) {
        Slope.x = Reverse(Slope.x);
    }

    if (BallPosition.y === 490 && BallPosition.x >= HumanX && BallPosition.x <= HumanX + 50) {
        Down = false;
    }

    if (BallPosition.y <= 0) {
        Down = true;
    }
}

//Sets up shit
document.addEventListener("keydown", Movement);
var BallVisibility = setInterval(Visibility, 1);
var Ball = setInterval(BallMovement, 60);
