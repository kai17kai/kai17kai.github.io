const canvas = document.querySelector("#canvas");
canvas.height = 600; // pick whatever dimensions fit on your screen
canvas.width = 800;
const context = canvas.getContext("2d");

//Sets color
context.fillStyle = "rgb(255, 255, 255)";

function clear(){
	let temp = context.fillStyle; 						
	context.fillStyle = "rgb(0,0,0)";
	context.fillRect(0,0, canvas.width, canvas.height);
	context.fillStyle = temp;
}

clear();

var EnemyPosition = [];
EnemyPosition.push(Math.floor(Math.random() * (800 - 700 + 1)) + 700);
EnemyPosition.push(Math.floor(Math.random() * (600 - 500 + 1)) + 500);

function Visibility() {
    context.arc(100, 100, 30, 0, 2*Math.PI, false);
    context.closePath();
	context.fill()
}

Visibility();