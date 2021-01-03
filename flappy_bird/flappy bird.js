const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

//Sets colors
context.fillStyle = "rgb(0, 0, 0)";

//Array that holds the positions of the obstacles
var ObstaclesPositions = new Array;

//Holds player's y location
var Player = 280;

context.clearRect(0, 0, canvas.width, canvas.height);

function clear() {
    let temp = context.fillStyle;
    context.fillStyle = "rgb(255, 255, 255)";
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        context.fillRect(ObstaclesPositions[x], 0, 50, ObstaclesPositions[x + 1]);
        context.fillRect(ObstaclesPositions[x], ObstaclesPositions[x + 1] + 100, 50, canvas.height);
    }
}

var CreateObstacles = setInterval(() => {    
    ObstaclesPositions.push(730);
    ObstaclesPositions.push(Math.floor(Math.random() * 450 - 400 + 1) + 400);
}, 2500);

//Moves the obstacles
var MoveObstacles = setInterval(() => {
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        if (ObstaclesPositions[x] >= 0) {
            ObstaclesPositions[x] -= 1
        } else {
            for (let x = 1; x <= 2; ++x) {
                ObstaclesPositions.shift();
            }
        }
    }
}, 10);

//allows player to see
var Visibility = setInterval(() => {
    clear();
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        let temp = context.fillStyle;
        context.fillStyle = "rgb(50, 205, 50)";
        context.fillRect(ObstaclesPositions[x], 0, 50, ObstaclesPositions[x + 1]);
        context.fillRect(ObstaclesPositions[x], ObstaclesPositions[x + 1] + 100, 50, canvas.height);
        context.fillStyle = temp;
    }

    context.arc(100, Player, 20, 0, 2 * Math.PI, false);
    context.fill();
}, 1);