const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

//set color
context.fillStyle = "rgb(255, 255, 255)";

function clear() {
    let temp = context.fillStyle;
    context.fillStyle = "rgb(255, 255, 255)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = temp;
}
clear();

var ObstaclesPositions = new Array;

var CreateObstacles = setInterval(() => {    
    ObstaclesPositions.push(730);
    ObstaclesPositions.push(Math.floor(Math.random() * 450 - 300 + 1) + 100);
}, 1500);

context.fillStyle = "rgb(0, 0, 0)";

var MoveObstacles = setInterval(() => {
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        if (ObstaclesPositions[x] + 50 >= 0) { 
            ObstaclesPositions[x] -= 1
        } else {
            for (let x = 1; x <= 2; ++x) {
                ObstaclesPositions.shift();
            }
        }
    }
}, 10)

var Visibility = setInterval(() => {
    clear()
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        context.fillRect(ObstaclesPositions[x], 0, 50, ObstaclesPositions[x + 1]);
    }
})