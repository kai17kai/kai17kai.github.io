const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

//Array that holds the positions of the obstacles
var ObstaclesPositions = new Array;

//Holds player's y location
var Player = 280;

var CreateObstacles = setInterval(() => {    
    ObstaclesPositions.push(800);
    ObstaclesPositions.push(Math.floor(Math.random() * 450 - 400 + 1) + 400);
}, 2500);

//Moves the obstacles
var MoveObstacles = setInterval(() => {
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        if (ObstaclesPositions[x] > 0) {
            ObstaclesPositions[x] -= 3
        } else {
            for (let x = 1; x <= 2; ++x) {
                ObstaclesPositions.shift();
            }
        }
    }
}, 30);

//allows player to see themselves and the obstacles
var Visibility = setInterval(() => {
    let temp = context.fillStyle;
    context.fillStyle = "white";
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        context.fillRect(ObstaclesPositions[x] + 3, 0, 50, ObstaclesPositions[x + 1]);
        context.fillRect(ObstaclesPositions[x] + 3, ObstaclesPositions[x + 1] + 100, 50, canvas.height);
    }

    context.fillStyle = "rgb(50, 205, 50)";
    //Draws obstacles
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        context.fillRect(ObstaclesPositions[x], 0, 50, ObstaclesPositions[x + 1]);
        context.fillRect(ObstaclesPositions[x], ObstaclesPositions[x + 1] + 100, 50, canvas.height);
    }
    context.fillStyle = temp;

    context.arc(100, Player, 20, 0, 2 * Math.PI, false);
    context.fill();
}, 1);