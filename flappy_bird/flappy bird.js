'use strict';

//function for high score
function highScore(min, sec) {
    var minTime = 0, secTime = 0;
    try { 
        minTime = parseFloat(localStorage.time.split(":")[0]);
        secTime = parseFloat(localStorage.time.split(":")[1]);
    } catch (e) {
        minTime = 0;
        secTime = 0;
    }
    if (!(typeof min === 'undefined') && !(typeof sec === "undefined")) {
        try {
            min = parseFloat(min);
            sec = parseFloat(sec);
        } catch (e) {
            min = 0;
            sec = 0;
        }
        if (min-minTime > 0) {
            minTime = min;
        }
        if (sec-secTime > 0) {
            secTime = sec;
        }
        
        if (secTime > 9) {
            localStorage.time = '' + minTime + ":" + secTime;
        } else {
            localStorage.time = '' + minTime + ":0" + secTime;
        }
    }
    if (isNaN(minTime) || isNaN(secTime)) {
        minTime = secTime = 0;
        localStorage.time = '0:00';
    }
}

let Issac_Image = new Image();
Issac_Image.src = "i_sprite.png";
let Ethan_Image = new Image();
Ethan_Image.src = "ethan.png";
let Allie_Image = new Image();
Allie_Image.src = "a_sprite.png";

//choice
let PlayerSpriteValue = 1;
let BackgroundValue = 1;

//audio
let PrizeAudio = new Audio();
PrizeAudio.src = "audio.mp4";

const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
const context = canvas.getContext("2d");

//background Background
const AllieBackground = document.createElement("img");
AllieBackground.src = "background.png";
const EthanBackground = document.createElement("img");
EthanBackground.src = "ethan background.png";

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

    if (mintime >= 10) {
        PrizeAudio.play();
    }
}
//Set up time
var sectime = 0, mintime = 0;
var timer = setInterval(time, 1000);
/*----------------------------------------------------------------*/

//animation counter
let frame = 0;

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
    ObstaclesPositions.push((ObstaclesPositions[ObstaclesPositions.length - 1] + ObstaclesPositions[ObstaclesPositions.length - 1] + 125) / 2);
}
, 1500);

const Game = () => {
    MoveObstacles();
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    if (BackgroundValue === 1) {
        context.drawImage(AllieBackground, 0, 0, 800, 600);
    } else {
        context.drawImage(EthanBackground, 0, 0, 800, 600);
    }

    context.fillStyle = "rgb(50, 205, 50)";

    //Draws obstacles
    for (let x = 0; x < ObstaclesPositions.length; x += 3) {
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

    if (PlayerSpriteValue == 2) {
        if (frame == 0) {
            context.drawImage(Issac_Image, 0, 0, 1024, 1024, 100, Player, 60, 60);
        } else if (frame == 1) {
            context.drawImage(Issac_Image, 1024, 0, 1024, 1024, 100, Player, 60, 60);
        } else if (frame == 2) {
            context.drawImage(Issac_Image, 0, 1024, 1024, 1024, 100, Player, 60, 60);
        }
    } else if (PlayerSpriteValue == 1) {
        context.drawImage(Ethan_Image, 0, frame * 32, 32, 32, 100, Player, 60, 60);
    } else if (PlayerSpriteValue == 3) {
        if (frame == 0) {
            context.drawImage(Allie_Image, 0, 0, 1024, 1024, 100, Player, 100, 100);
        } else if (frame == 1) {
            context.drawImage(Allie_Image, 1024, 0, 1024, 1024, 100, Player, 100, 100);
        } else if (frame == 2) {
            context.drawImage(Allie_Image, 0, 1024, 1024, 1024, 100, Player, 100, 100);
        } else if (frame == 3) {
            context.drawImage(Allie_Image, 1024, 1024, 1024, 1024, 100, Player, 100, 100);
        } else if (frame == 4) {
            context.drawImage(Allie_Image, 2048, 0, 1024, 1024, 100, Player, 100, 100);
        }
    }
    
    context.fillStyle = "black";
    if (sectime < 10) {
        context.fillText(`Time: ${mintime}:0${sectime}`, 0, 30);
    } else {
        context.fillText(`Time: ${mintime}:${sectime}`, 0, 30);
    }
    highScore(mintime, sectime);
    context.fillText("High Score: " + localStorage.time, 0, 50);

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
    
    if (e.key === "!") {
        BackgroundValue = 1;
    } else if (e.key === "@") {
        BackgroundValue = 2;
    } else if (parseInt(e.key) < 4 && parseInt(e.key) > 0) {
        frame = 0;
        PlayerSpriteValue = parseInt(e.key);
    }
}

window.onkeyup = (e) => {
    if (e.key === " ") {
        Up = false;
    }
}

let counter = setInterval(() => {
    ++frame;
    if (PlayerSpriteValue == 2) {
        if (!(frame < 3)) {
            frame = 0;
        }
    } else if (PlayerSpriteValue == 1) {
        if (!(frame < 2)) {
            frame = 0;
        }
    } else if (PlayerSpriteValue == 3) {
        if (!(frame < 4)) {
            frame = 0;
        }
    }
}, 83);