const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

//Interval for Ball Movement
var Ball;

var V;

//Speed for the Ball
var Speed = 45;

//set color
context.fillStyle = "rgb(255, 255, 255)";

//Score
var Score = 0;

function highScore(score) {
    var saved = 0;
    try { saved = parseFloat(localStorage.pongHighScore); } catch (e) { saved = 0; }
    if (!(typeof score === 'undefined')) {
        try { score = parseFloat(score); } catch (e) { score = 0; }
        if (score>saved) {
            saved = score;
            localStorage.pongHighScore = '' + score;
        }
    }
    if (isNaN(saved)) {
        saved = 0;
        localStorage.pongHighScore = '0';
    }
    return saved;
}

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
var Human = 270, Computer = 270, BallX, BallY;

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
} else{
    y2 = true;
}

//Up or down
Choice = Math.floor(Math.random() * 2);
if (Choice === 0) {
    Down = true;
} else {
    Down === false;
}

//Left or right
Choice = Math.floor(Math.random() * 2);
if (Choice === 0) {
    Slope.x = Reverse(Slope.x);
}

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

    //Checks if the ball is hitting the Human or Computer board and chooses what the reaction will be
    Reaction();

    Computer = BallY - 25;

    //Checks if the ball is at the edge of the map on both sides
    if (BallX <= 0 || BallX >= 800) {
        IsDead();
    }

    function Reaction() {
        if (BallY + 20 > Computer && BallY < Computer + 60 && BallX + 20 === 770) {
            Slope.x = Reverse(Slope.x);
            IncreaseSpeed();
            ChangeSlope();
        }

        if (BallY + 20 > Human && BallY < Human + 60 && BallX === 30) {
            Slope.x = Reverse(Slope.x);
            ++Score;
            document.getElementById("Score").innerHTML = `Score: ${Score}`;
            document.getElementById("HighScore").innerHTML = "High Score: " + highScore(Score);
            IncreaseSpeed();
            ChangeSlope()
        }

        function IncreaseSpeed() {
            Speed -= 1;
            clearInterval(Ball);
            Ball = setInterval(BallMovement, Speed);
        }

        function ChangeSlope() {
            if (/*Computer*/BallY + 20 < Computer + 20 || BallY > Computer + 40 || /*Human*/BallY + 20 < Human + 20 || BallY > Human + 40) {
                y1 = false;
                y2 = true;
            } else {
                y1 = true;
                y2 = false;
            }
        }
    }
}


context.font = "40px Arial";
context.fillText("Press Space To Start", 210, 300);
let done = false;
let rectTop = canvas.getBoundingClientRect().top;
document.addEventListener("mousemove", (e) => {
    Human = e.clientY - rectTop - 30;
    if (Human < 0) {
        Human = 0;
    } else if (Human + 60 > 600) {
        Human = 540;
    }
});

document.onkeydown = (e) => {
    if (done == false) {
        if (e.key == " ") {
            e.preventDefault();
            Start();
            done = true;
        }
    }
}
function Start() {
    clearInterval(V);
    clearInterval(Ball);
    V = setInterval(Visibility, 1);
    Ball = setInterval(BallMovement, 45);
    BallX = 390, BallY = 290, Speed = 35;
    Score = 0;
    document.getElementById("Score").innerHTML = "Score: 0";
}

function IsDead() {
    clearInterval(V);
    clearInterval(Ball);
    context.font = "40px Arial";
    context.fillText("You Died", 380, 280);
}
