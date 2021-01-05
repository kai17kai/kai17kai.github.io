'use strict';

const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

//Array that holds the positions of the obstacles
var ObstaclesPositions = new Array;

//Holds player's y location
var Player = 280;

//Moves the obstacles
function MoveObstacles() {
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        ObstaclesPositions[x] -= 4;
    }
}

//creates obstacles at 2.5 seconds
var CreateObstacles = setInterval(() => {    
    ObstaclesPositions.push(800);
    ObstaclesPositions.push(Math.floor(Math.random() * 450 - 400 + 1) + 400);
}, 2500);

//allows player to see themselves and the obstacles
var Visibility = setInterval(() => {
    MoveObstacles();
    let temp = context.fillStyle;
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        if (ObstaclesPositions[x] >= 0) {
            context.clearRect(ObstaclesPositions[x] + 4, 0, 50, ObstaclesPositions[x + 1]);
            context.clearRect(ObstaclesPositions[x] + 4, ObstaclesPositions[x + 1] + 100, 50, canvas.height);
            if (ObstaclesPositions[x] < 0) {
                ObstaclesPositions[x] = null;
                ObstaclesPositions[x + 1] = null;
                for (let i = 0; i < 1; ++i) {
                    ObstaclesPositions.shift();
                }
            }
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

    temp = null;
}, 30);