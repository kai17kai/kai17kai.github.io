'use strict';

let Issac_Image = new Image(32, 32);
Issac_Image.src = "i_sprite.png";

const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

const image = document.createElement("img");
image.src = "background.png";

context.font = "20px Arial";

/*----------------------------------------------------------------*/
//Set up time
var sectime = 0, mintime = 0;
var time = setInterval(() => {
    sectime += 1;
    if (sectime > 59) {
        sectime = 0;
        mintime += 1;
    }

    if (sectime % 10 == 0) {
        clearInterval(Visibility);
        Speed -= 1;
        Visibility = setInterval(Game, Speed);
    }
}, 1000);
/*----------------------------------------------------------------*/

//animation counter
let frame = 1;

//Array that holds the positions of the obstacles
var ObstaclesPositions = new Array;

//Holds player's y location
var Player = 280;
var Up = false;

//Moves the obstacles
function MoveObstacles() {
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        ObstaclesPositions[x] -= 4;
    }
}

//creates obstacles at 2.5 seconds
var CreateObstacles = setInterval(() => {    
    ObstaclesPositions.push(800);
    ObstaclesPositions.push(Math.floor(Math.random() * 200 + 1) + 150);
}, 2500);

const Game = () => {
    MoveObstacles();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);

    context.fillStyle = "rgb(50, 205, 50)";

    //Draws obstacles
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        if (ObstaclesPositions[x] > 0) {
            context.fillRect(ObstaclesPositions[x], 0, 50, ObstaclesPositions[x + 1]);
            context.fillRect(ObstaclesPositions[x], ObstaclesPositions[x + 1] + 125, 50, canvas.height - ObstaclesPositions[x + 1] + 125);
        }

        if ((Player >= 0 && Player <= ObstaclesPositions[x + 1]) || (Player >= ObstaclesPositions[x + 1] + 125 && Player <= canvas.height)) {
            let distance = Math.sqrt(Math.pow(100 - ObstaclesPositions[x], 2));
            if (distance <= 20 || (ObstaclesPositions[x] < 100 && distance <= 70)) {
                Player = 700;
            }
        }
    }

    if (frame == 1) {
        context.drawImage(Issac_Image, 0, 0, 1024, 1024, 100, Player, 60, 60);
    } else if (frame == 2) {
        context.drawImage(Issac_Image, 1024, 0, 1024, 1024, 100, Player, 60, 60);
    } else if (frame == 3) {
        context.drawImage(Issac_Image, 0, 1024, 1024, 1024, 100, Player, 60, 60);
    }
    

    context.fillStyle = "black";
    if (sectime < 10) {
        context.fillText(`${mintime}:0${sectime}`, 0, 50);
    } else {
        context.fillText(`${mintime}:${sectime}`, 0, 50);
    }

    if (Player >= canvas.height || Player <= 0) {
        dead();
        clearInterval(Visibility);
        clearInterval(time);
    }

    function dead() {
        context.fillStyle = "black";
        clearInterval(Visibility);
        clearInterval(time);
        context.font = "40px Arial";
        context.fillText("You Died", 380, 280);
    }

    function AtEdge(x) {
        if (ObstaclesPositions[x] < 0) {
            ObstaclesPositions[x] = null;
            ObstaclesPositions[x + 1] = null;
            for (let i = 0; i < 1; ++i) {
                ObstaclesPositions.shift();
            }
        }  
    }
};
//allows player to see themselves and the obstacles
var Visibility, Speed = 31;
Visibility = setInterval(Game, Speed);

var Velocity = 4;
var Gravity = setInterval(() => {
    if (Up == false) {
        Player += Velocity;
    } else {
        Player -= 6;
    }
}, 30); 

function Jump(e) {
    if (e.key === " ") {
        e.preventDefault();
        Up = true;
    }
}

function Down(e) {
    if (e.key === " ") {
        Up = false;
    }
}

document.addEventListener("keydown", Jump);

document.addEventListener("keyup", Down);

let counter = setInterval(() => {
    ++frame
    if (frame == 4) {
        frame = 1;
    }
}, 83);