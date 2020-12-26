const canvas = document.querySelector("#canvas");
canvas.height = 600; // pick whatever dimensions fit on your screen
canvas.width = 800;
const context = canvas.getContext("2d");

function clear() {
	let temp = context.fillStyle;
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0,0, canvas.width, canvas.height);
    context.fillStyle = temp;
}

clear();

//Sets color
context.fillStyle = "rgb(255, 255, 255)";

//Player Position
var PlayerPosition = {x: 100, y: 300};

//Player Movement
function PlayerMovement(e) {
    if (e.key === "s") {
        PlayerPosition.y += 20;
        if (PlayerPosition.y >= 750) {
            PlayerPosition.y -= 20;
        }
    } else if (e.key === "w") {
        PlayerPosition.y -= 20;
        if (PlayerPosition.y < 0) {
            PlayerPosition.y += 20
        }
    }
}

/*------------------------------------------------------------------------*/
//All the shit about the bullets

//Bullet Amount
var Ammo = 10;

//Bullet Position
var BulletPosition = [];

function Shoot(e) {
	if (e.key === "d" && Ammo > 0) {
		Ammo -= 1
		BulletPosition.push(PlayerPosition.x + 10);
		BulletPosition.push(PlayerPosition.y);
	}
}

function BulletMovement() {
	for (let i = 0; i < BulletPosition.length; i += 2) {
		BulletPosition[i] += 10;
	}
}

/*----------------------------------------------------*/

//Enemy
var EnemyPosition = [];
EnemyPosition.push(Math.floor(Math.random() * 100) + 700) + 1;
EnemyPosition.push(Math.floor(Math.random() * 600)) + 1;

function Visibility() {
	clear();

	//Enemy
	for (let i = 0; i <= EnemyPosition.length; i += 2) {
    	context.arc(EnemyPosition[i], EnemyPosition[i + 1], 30, 0, 2*Math.PI, false);
    	context.closePath();
		context.fill();
	}

	//Bullet
	for (let i = 0; i < BulletPosition.length; i += 2) {
		context.arc(BulletPosition[i], BulletPosition[i + 1], 10, 0, 2*Math.PI, false);
		context.closePath();
		context.fill();
	}

	//Player
	context.arc(PlayerPosition.x, PlayerPosition.y, 30, 0, 2*Math.PI, false);
	context.closePath()
	context.fill();
}

document.addEventListener("keydown", PlayerMovement);
document.addEventListener("keydown", Shoot);

var MakeVisible = setInterval(Visibility, 1);
var Movement = setInterval(BulletMovement, 50);
