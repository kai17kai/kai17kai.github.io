const canvas = document.querySelector("#canvas");
canvas.height = 600; // pick whatever dimensions fit on your screen
canvas.width = 800;
const context = canvas.getContext("2d");

//Returns oposite value
function Reverse(number) {
    return (-number);
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
var BallPosition = {x:700, y:10};

//Slope
var Slope = {
    y: 2,
    x: 10
}

//Creates board
context.fillRect(400, 500, 50, 10)

//Human Position
var HumanX = 400;

//Human Movement
function Movement(e) {
    if (e.key === "d") {
        HumanX += 20;
        if (HumanX >= 750) {
            HumanX -= 20;
        }
    } else if (e.key === "a") {
        HumanX -= 20;
        if (HumanX <= 0) {
            HumanX += 20
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
var Down = true, Right = true;
function BallMovement() {
    BallPosition.x += Slope.x;
    if (Down === true) {
        BallPosition.y += Slope.y;
    } else if (Down === false){
        BallPosition.y -= Slope.y;
    }
        
    if (BallPosition.x > 790 || BallPosition.x < 0) {
        Slope.x = Reverse(Slope.x)
    } 


    if (BallPosition.y === 500 && BallPosition.x >= HumanX && BallPosition.x <= HumanX + 50) {
        Down = false;
    }

    if (BallPosition.y <= 0) {
        Down = true;
    }

    if (BallPosition.y >= 600) {
        clearInterval(BallVisibility);
        clearInterval(Ball);
        clear();
        context.font = "30px Arial";
        context.fillText("You Died", 400, 300);
    }
}

//Sets up shit
document.addEventListener("keydown", Movement);
var BallVisibility = setInterval(Visibility, 1);
var Ball = setInterval(BallMovement, 60);
