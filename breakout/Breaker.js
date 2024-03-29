"use strict";

const canvas = document.querySelector("#canvas");
canvas.height = 600; // pick whatever dimensions fit on your screen
canvas.width = 800;
const context = canvas.getContext("2d");

let score = 0;

//set up high score
function highScore(score) {
    var saved = 0;
    try { saved = parseFloat(localStorage.breakHighScore); } catch (e) { saved = 0; }
    if (!(typeof score === 'undefined')) {
        try { score = parseFloat(score); } catch (e) { score = 0; }
        if (score>saved) {
            saved = score;
            localStorage.breakHighScore = '' + score;
        }
    }
    if (isNaN(saved)) {
        saved = 0;
        localStorage.breakHighScore = '0';
    }
    return saved;
}

//Used when block is hit
function Reaction(position) {
    //bottom
    if (BallPosition.x + 10 >= ObstacleLocations[position] &&
        BallPosition.x <= ObstacleLocations[position] + 50 &&
        BallPosition.y >= ObstacleLocations[position + 1]) {
            console.log("bottom");
            Down = true;
    }
    //top
    if (BallPosition.x + 10 >= ObstacleLocations[position] &&
        BallPosition.x <= ObstacleLocations[position] + 50 &&
        BallPosition.y + 10 <= ObstacleLocations[position + 1]) {
            console.log("top")
            Down = false;
    }
    //left and right
    if ((BallPosition.x + 10 <= ObstacleLocations[position] || BallPosition.x >= ObstacleLocations[position]) &&
        BallPosition.y + 10 >= ObstacleLocations[position + 1] &&
        BallPosition.y <= ObstacleLocations[position + 1]) {
            Slope.x = Reverse(Slope.x);
    }

    ObstacleLocations[position] = 0;
    ObstacleLocations[position + 1] = 0;

    clearInterval(Ball);
    if (Speed > 30) {
        Speed -= 1;
    }
    Ball = setInterval(BallMovement, Speed);
}

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

//Sets color white
context.fillStyle = "rgb(255, 255, 255)";

//Current ball position
var BallPosition = {x:400, y:400};

var Replace = [
    //First
    60,
    20,
    140,
    20,
    220,
    20,
    300,
    20,
    380,
    20,
    460,
    20,
    540,
    20,
    620,
    20,
    700,
    20,
    //Second
    60,
    60,
    140,
    60,
    220,
    60,
    300,
    60,
    380,
    60,
    460,
    60,
    540,
    60,
    620,
    60,
    700,
    60,
    //Third
    60,
    100,
    60,
    100,
    140,
    100,
    220,
    100,
    300,
    100,
    380,
    100,
    460,
    100,
    540,
    100,
    620,
    100,
    700,
    100,
    //Fourth
    60,
    140,
    140,
    140,
    220,
    140,
    300,
    140,
    380,
    140,
    460,
    140,
    540,
    140,
    620,
    140,
    700,
    140,
    //Fifth
    60,
    180,
    140,
    180,
    220,
    180,
    300,
    180,
    380,
    180,
    460,
    180,
    540,
    180,
    620,
    180,
    700,
    180,
]

//Obstacle Locations
var ObstacleLocations = Replace;

//Slope
var Slope = {
    y1: 2,
    y2: 4,
    y3: 6,
    x: 10
}

//Human Position
var HumanX = 400;

//Human Movement
function Movement(e) {
    if (e.key === "d" || e.key === "ArrowRight") {
        HumanX += 20;
        if (HumanX >= 750) {
            HumanX -= 20;
        }
    } else if (e.key === "a" || e.key === "ArrowLeft") {
        HumanX -= 20;
        if (HumanX < 0) {
            HumanX += 20;
        }
    }

    console.log(String(HumanX))
}

//Visibility of the board and ball
function Visibility() {
    clear();
    context.fillRect(HumanX, 500, 60, 10);
    context.fillRect(BallPosition.x, BallPosition.y, 10, 10)
    for (let i = 0; i <= ObstacleLocations.length; i += 2) {
        if (ObstacleLocations[i] != 0 && ObstacleLocations[i + 1] != 0) {
            context.fillRect(ObstacleLocations[i], ObstacleLocations[i + 1], 50, 10);
        }
    }
}

//Ball Movement
var Down = true, y1, y2, y3;

var Choice = Math.floor(Math.random() * 3) + 1;
if (Choice === 1) {
    y1 = true;
} else if (Choice === 2) {
    y2 = true;
} else if (Choice === 3) {
    y3 = true
}

Choice = Math.floor(Math.random() * 2);
if (Choice === 1) {
    Slope.x = Reverse(Slope.x);
}

function BallMovement() {
    BallPosition.x += Slope.x;
    if (y3 === true) {
        Down ? BallPosition.y += Slope.y3 : BallPosition.y -= Slope.y3
    } else if (y2 === true) {
        Down ? BallPosition.y += Slope.y2 : BallPosition.y -= Slope.y2;
    } else if (y1 === true) {
        Down ? BallPosition.y += Slope.y1 : BallPosition.y -= Slope.y1;
    }

    if (BallPosition.x > 790 || BallPosition.x < 0) {
        Slope.x = Reverse(Slope.x)
    }

    if (BallPosition.y >= 490 && BallPosition.y <= 500 && BallPosition.x + 10 >= HumanX && BallPosition.x <= HumanX + 50) {
        y1 = false, y2 = false, y3 = false;
        Down = false;
        if (BallPosition.x < HumanX + 10 || BallPosition.x > HumanX + 40) {
            if (BallPosition.x < HumanX + 10) {
                y1 = true;
            }
        } else if ((BallPosition.x > HumanX + 10 && BallPosition.x < HumanX + 20) || (BallPosition.x > HumanX + 30 && BallPosition.x < HumanX + 40)) {
            if (BallPosition.x > HumanX + 10 && BallPosition.x < HumanX + 20) {
                y2 = true;
            }
        } else {
            y3 = true
        }
    }

    if (BallPosition.y <= 0) {
        Down = true;
    }

    if (BallPosition.y >= 600) {
        Dead();
    }

    for (let i = 0; i <= ObstacleLocations.length; i += 2) {
        if (BallPosition.x + 10 > ObstacleLocations[i] &&
            BallPosition.x < ObstacleLocations[i] + 50 &&
            BallPosition.y + 10 > ObstacleLocations[i + 1] &&
            BallPosition.y < ObstacleLocations[i + 1] + 10) {
            Reaction(i);
            break;
        }
    }
    
    score = 0;
    for (let i = 0; i <= ObstacleLocations.length; i += 2) {
        if (ObstacleLocations[i] == 0) {
            ++score;
        }
    }

    document.getElementById("score").innerHTML = `Score: ${score}`;
    document.getElementById("old").innerHTML = "High Score: " + highScore(score); 
}

var Ball, Speed, BallAndBoardVisibility;

//Sets up shit
function Start() {
    ObstacleLocations = new Array();
    for (let i = 0; i < Replace.length; ++i) {
        ObstacleLocations.push(Replace[i]);
    }
    BallPosition.x = 400;
    BallPosition.y = 400;
    Speed = 45;
    Down = true;
    score = 0;
    document.getElementById("old").innerHTML = "High Score: " + highScore(score);
    document.getElementById("score").innerHTML = "Score: 0";
    clearInterval(Ball);
    clearInterval(BallAndBoardVisibility);
    BallAndBoardVisibility = setInterval(Visibility, 1);
    Ball = setInterval(BallMovement, Speed);
}

function Dead() {
    context.fillText("You died", 400, 300);
    document.addEventListener("keydown", Movement);
    clearInterval(Ball);
    clearInterval(BallAndBoardVisibility);
}

context.fillStyle = "white";
context.font = "40px Arial";
context.fillText("Press Space To Start", 200, 300);
let done = false;
document.onkeydown = (e) => {
    if (e.key == " " && done === false) {
        e.preventDefault();
        Start();
        done = true;
    }
}

let rect = canvas.getBoundingClientRect().left;
document.onmousemove = (e) => {
    HumanX = e.clientX - rect - 30;
    if (HumanX < 0) {
        HumanX = 0;
    } else if (HumanX > 740) {
        HumanX = 740;
    }
}
