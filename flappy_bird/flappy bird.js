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
    Player += 4;
}

//creates obstacles at 2.5 seconds
var CreateObstacles = setInterval(() => {    
    ObstaclesPositions.push(800);
    ObstaclesPositions.push(Math.floor(Math.random() * 450 - 400 + 1) + 400);
}, 2500);

const FunctionShit = () => {
    MoveObstacles();
    let temp = context.fillStyle;
    context.fillStyle = "rgb(255, 255, 255)";
    clear(AtEdge);

    context.fillStyle = "rgb(50, 205, 50)";

    //Draws obstacles
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        if (ObstaclesPositions[x] > 0) {
            context.fillRect(ObstaclesPositions[x], 0, 50, ObstaclesPositions[x + 1]);
            context.fillRect(ObstaclesPositions[x], ObstaclesPositions[x + 1] + 125, 50, canvas.height - ObstaclesPositions[x + 1] + 125);
        }
    }

    context.fillStyle = temp;

    context.beginPath();
    context.arc(100, Player, 20, 0, 2 * Math.PI, false);
    context.closePath();
    context.fill();

    if (Player >= canvas.height) {
        context.fillStyle = "rgb(255, 255, 255)";

        for (let x = 0; x < ObstaclesPositions.length; x += 2) {
            if (ObstaclesPositions[x] >= 0) {
                context.clearRect(ObstaclesPositions[x], 0, 50, ObstaclesPositions[x + 1]);
                context.clearRect(ObstaclesPositions[x], ObstaclesPositions[x + 1] + 125, 50, canvas.height - ObstaclesPositions[x + 1] + 125);
                AtEdge(x);
            }
        }
    
        context.beginPath();
        context.arc(100, Player - 4, 30, 0, 2 * Math.PI, false);
        context.closePath();
        context.fill();

        clearInterval(Visibility);
        clear(AtEdge);
        context.fillStyle = temp;
        context.font = "40px Arial";
        context.fillText("You Died", 380, 280);
    }

    temp = null;

    function AtEdge(x) {
        if (ObstaclesPositions[x] < 0) {
            ObstaclesPositions[x] = null;
            ObstaclesPositions[x + 1] = null;
            for (let i = 0; i < 1; ++i) {
                ObstaclesPositions.shift();
            }
        }
    }

    function clear(AtEdge) {
        for (let x = 0; x < ObstaclesPositions.length; x += 2) {
            if (ObstaclesPositions[x] >= 0) {
                context.clearRect(ObstaclesPositions[x] + 4, 0, 50, ObstaclesPositions[x + 1]);
                context.clearRect(ObstaclesPositions[x] + 4, ObstaclesPositions[x + 1] + 125, 50, canvas.height - ObstaclesPositions[x + 1] + 125);
                AtEdge(x);
            }
        }
    
        context.beginPath();
        context.arc(100, Player - 4, 30, 0, 2 * Math.PI, false);
        context.closePath();
        context.fill();
    }
};
//allows player to see themselves and the obstacles
var Visibility;
Visibility = setInterval(FunctionShit, 30);

document.addEventListener("keydown",() => {
    clearInterval(Visibility);
});

document.addEventListener("keyup",() => {
    Visibility = setInterval(FunctionShit, 30);
})