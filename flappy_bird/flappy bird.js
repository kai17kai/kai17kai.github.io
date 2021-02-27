'use strict';

let Issac_Image = new Image();
Issac_Image.src = "i_sprite.png";
let Ethan_Image = new Image();
Ethan_Image.src = "ethan.png";
let Allie_Image = new Image();
Allie_Image.src = "a_sprite.png";

//choice
let value = 1;

const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

const image = document.createElement("img");
image.src = "background.png";
image.height = 600;
image.width = 800;

context.font = "20px Arial";

/*----------------------------------------------------------------*/

let time = () => {
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
}
//Set up time
var sectime = 0, mintime = 0;
var timer = setInterval(time, 1000);
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

let x = () => {    
    ObstaclesPositions.push(800);
    ObstaclesPositions.push(Math.floor(Math.random() * 200 + 1) + 150);
}

//creates obstacles at 2.5 seconds
var CreateObstacles = setInterval(x, 2500);

const Game = () => {
    MoveObstacles();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, 800, 600);

    context.fillStyle = "rgb(50, 205, 50)";

    //Draws obstacles
    for (let x = 0; x < ObstaclesPositions.length; x += 2) {
        if (ObstaclesPositions[x] > 0) {
            context.fillRect(ObstaclesPositions[x], 0, 50, ObstaclesPositions[x + 1]);
            context.fillRect(ObstaclesPositions[x], ObstaclesPositions[x + 1] + 125, 50, canvas.height - ObstaclesPositions[x + 1] + 125);
        }

        let PlayerX = 130;
        let PlayerY = Player + 30;

        let ObstacleTopX = ObstaclesPositions[x] + 25
        let ObstacleTopY = ObstaclesPositions[x + 1] / 2;
        let ObstacleBottomX = ObstaclesPositions[x] + 25;
        let ObstacleBottomY = (canvas.height - ObstaclesPositions[x + 1] + 125) / 2;
        let TopDistance = Math.sqrt(Math.pow(ObstacleTopX - PlayerX, 2) + Math.pow(ObstacleTopY - PlayerY, 2));
        let BottomDistance = Math.sqrt(Math.pow(ObstacleBottomX - 100, 2) + Math.pow(ObstacleBottomY - Player, 2));
        if (/*Testing Distance*/(TopDistance < (ObstaclesPositions[x] / 2) + 30 || BottomDistance < (canvas.height - ObstaclesPositions[x + 1] + 125) / 2 + 30) && /*Testing if the Player is in between the obstacles*/((PlayerY > 0 && Player < ObstaclesPositions[x + 1]) || (PlayerY > ObstaclesPositions[x + 1] + 125 && PlayerY < canvas.height)) && ObstaclesPositions[x] > 100 && ObstaclesPositions[x] < 130) {
            Player = 800;
        }
    }

    if (value == 2) {
        if (frame == 1) {
            context.drawImage(Issac_Image, 0, 0, 1024, 1024, 100, Player, 60, 60);
        } else if (frame == 2) {
            context.drawImage(Issac_Image, 1024, 0, 1024, 1024, 100, Player, 60, 60);
        } else if (frame == 3) {
            context.drawImage(Issac_Image, 0, 1024, 1024, 1024, 100, Player, 60, 60);
        }
    } else if (value == 1) {
        if (frame == 1) {
            context.drawImage(Ethan_Image, 0, 0, 32, 32, 100, Player, 60, 60);
        } else if (frame == 2) {
            context.drawImage(Ethan_Image, 0, 32, 32, 32, 100, Player, 60, 60);
        }
    } else if (value == 3) {
        if (frame == 1) {
            context.drawImage(Allie_Image, 0, 0, 1024, 1024, 100, Player, 100, 100);
        } else if (frame == 2) {
            context.drawImage(Allie_Image, 1024, 0, 1024, 1024, 100, Player, 100, 100);
        } else if (frame == 3) {
            context.drawImage(Allie_Image, 0, 1024, 1024, 1024, 100, Player, 100, 100);
        } else if (frame == 4) {
            context.drawImage(Allie_Image, 1024, 1024, 1024, 1024, 100, Player, 100, 100);
        } else if (frame == 5) {
            context.drawImage(Allie_Image, 2048, 0, 1024, 1024, 100, Player, 100, 100);
        }
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
        clearInterval(Gravity);
        clearInterval(CreateObstacles);
        clearInterval(timer);
        window.onkeydown = null;
        window.onkeyup = null;
    }

    function dead() {
        context.fillStyle = "black";
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

const d = () => {
    if (Up == false) {
        Player += Velocity;
    } else {
        Player -= 6;
    }
}

var Velocity = 4;
var Gravity = setInterval(d, 30); 

window.onkeydown = (e) => {
    if (e.key === " ") {
        e.preventDefault();
        Up = true;
    }
    if (Number(e.key) < 4 && Number(e.key) > 0) {
        value = Number(e.key);
    }
}

window.onkeyup = (e) => {
    if (e.key === " ") {
        Up = false;
    }
}

let counter = setInterval(() => {
    ++frame
    if (value == 2) {
        if (frame >= 4) {
            frame = 1;
        }
    } else if (value == 1) {
        if (frame >= 3) {
            frame = 1;
        }
    } else if (value == 3) {
        if (frame >= 5) {
            frame = 1;
        }
    }
}, 83);