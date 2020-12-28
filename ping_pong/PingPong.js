const canvas = document.querySelector("#canvas");
canvas.height = 600; // pick whatever dimensions fit on your screen
canvas.width = 800;
const context = canvas.getContext("2d");

//sets color
context.fillStyle = "rgb(0, 0, 0)";

function clear() {
    let temp = context.fillStyle;
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = temp;
}
clear();

//Position of Player, Computer, and Ball
var Human = 300, Computer = 300, BallX = 400, BallY = 300;

function Movement(e) {
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
    clear();
    context.fillRect(100, Human, 10, 50);
    context.fillRect(700, Computer, 10, 50);
    context.fillRect(BallX, BallY, 10, 10);
}

var V = setInterval(Visibility, 1);
document.addEventListener("keydown", Movement);