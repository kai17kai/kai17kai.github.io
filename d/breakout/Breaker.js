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
context.fillStyle = "rgb(255, 255, 255)";

//Current ball position
var BallPosition = {x:400, y:400};

//Slope
var Slope = {
    y1: 1,
    y2: 3,
    y3: 5,
    x: 10
}

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
    context.fillRect(HumanX, 500, 80, 10);
    context.fillRect(BallPosition.x, BallPosition.y, 10, 10)
}




//Ball Movement
var Down = false, y1, y2, y3 = true;
function BallMovement() {
    BallPosition.x += Slope.x;
    if (y3 === true) {
        if (Down === true) {
            BallPosition.y += Slope.y3;
        } else if (Down === false) {
            BallPosition.y -= Slope.y3;
        }
    } else if (y2 === true) {
        if (Down === true) {
            BallPosition.y += Slope.y2;
        } else if (Down === false) {
            BallPosition.y -= Slope.y2;
        }
    } else if (y1 === true) {
        if (Down === true) {
            BallPosition.y += Slope.y1;
        } else if (Down === false) {
            BallPosition.y -= Slope.y1;
        }
    }

    if (BallPosition.x > 790 || BallPosition.x < 0) {
        Slope.x = Reverse(Slope.x)
    }

    if (BallPosition.y >= 500 && BallPosition.y <= 510 && BallPosition.x >= HumanX && BallPosition.x <= HumanX + 50) {
        y1 = false, y2 = false, y3 = false;
        Down = false;
        if (BallPosition.x < HumanX + 10 || BallPosition.x > HumanX + 40) {
            if (BallPosition.x < HumanX + 10) {
                if (Slope.x < 0) {
                    y1 = true;
                } else if (Slope.x > 0) {
                    Slope.x = Reverse(Slope.x);
                    y1 = true;
                }
            } else {
                if (Slope.x < 0) {
                    Slope.x = Reverse(Slope.x);
                    y1 = true;
                } else if (Slope.x > 0) {
                    y1 = true;
                }
            }
        } else if ((BallPosition.x > HumanX + 10 && BallPosition.x < HumanX + 20) || (BallPosition.x > HumanX + 30 && BallPosition.x < HumanX + 40)) {
            if (BallPosition.x > HumanX + 10 && BallPosition.x < HumanX + 20) {
                if (Slope.x > 0) {
                    y2 = true;
                } else if (Slope.x < 0) {
                    Slope.x = Reverse(Slope.x);
                    y2 = true;
                }
            }
        } else {
            y3 = true
        }
    }

    if (BallPosition.y <= 0) {
        Down = true;
    }

    if (BallPosition.y >= 600) {
        clearInterval(BallAndBoardVisibility);
        clearInterval(Ball);
        clear();
        context.fillStyle = "white"
        context.font = "40px Arial";
        context.fillText("You Died", 400, 300);
    }
}

//Sets up shit
document.addEventListener("keydown", Movement);
var BallAndBoardVisibility = setInterval(Visibility, 1);
var Ball = setInterval(BallMovement, 60);

