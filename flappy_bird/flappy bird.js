const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

//Array that holds the positions of the obstacles
var ObstaclesPositions = new Array;

//Holds player's y location
var Player = 280;

function Reload() {
    while (ObstaclesPositions.length > 0) {
        ObstaclesPositions.pop();
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
}

var CreateObstacles = setInterval(() => {    
    ObstaclesPositions.push(800);
    ObstaclesPositions.push(Math.floor(Math.random() * 450 - 400 + 1) + 400);
}, 2500);

//Moves the obstacles
function MoveObstacles() {
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        ObstaclesPositions[x] -= 4;
    }
}

//allows player to see themselves and the obstacles
var Visibility = setInterval(() => {
    MoveObstacles();
    let temp = context.fillStyle;
    context.fillStyle = "white";
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        if (ObstaclesPositions[x] >= 0) {
            context.fillRect(ObstaclesPositions[x] + 4, 0, 50, ObstaclesPositions[x + 1]);
            context.fillRect(ObstaclesPositions[x] + 4, ObstaclesPositions[x + 1] + 100, 50, canvas.height);
        }
    }

    if (ObstaclesPositions[0] < 0 && ObstaclesPositions[1] < 0) {
        for (let x = 0; x < 2; ++x) {
            ObstaclesPositions.shift();
        }
    }

    context.arc(100, Player, 20, 0, 2 * Math.PI, false);
    context.fill();

    context.fillStyle = "rgb(50, 205, 50)";

    //Draws obstacles
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        if (ObstaclesPositions[x] > 0) {
            context.fillRect(ObstaclesPositions[x], 0, 50, ObstaclesPositions[x + 1]);
            context.fillRect(ObstaclesPositions[x], ObstaclesPositions[x + 1] + 125, 50, canvas.height);
        }
    }

    context.fillStyle = temp;

    context.arc(100, Player, 20, 0, 2 * Math.PI, false);
    context.fill();
}, 40);