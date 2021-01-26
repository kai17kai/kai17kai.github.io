const canvas = document.querySelector("#canvas");
canvas.height = 500; // pick whatever dimensions fit on your screen
canvas.width = 700;
const context = canvas.getContext("2d");

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

//Set Color
context.fillStyle = "rgb(33,66,99)";

//Creates computer circle
var ComputerX = 0, ComputerY = 0;

function ComputerCircle() {
	let distance;
	do {
		ComputerX = Math.floor(Math.random() * 700);
		ComputerY = Math.floor(Math.random() * 500);
		distance = Math.sqrt(Math.pow(HumanX - ComputerX, 2) + Math.pow(HumanY - ComputerY, 2))
		console.log(distance);
	} while (distance <= 100)
	var temp = context.fillStyle;
	context.fillStyle = "red";
	context.beginPath();
	context.arc(ComputerX,ComputerY,30,0,2*Math.PI,false);
	context.closePath();
	context.fill();
	context.fillStyle = temp;
}

//Movement
var HumanY = 125, HumanX = 125; // coordinates for the moving circle

function Level(e){ // basic key-press function to move the circle around
	if (e.key === "w" || e.key === "ArrowUp") { // reset center of circle based on key pressed
		HumanY -= 6;
		if (HumanY <= 0) {
			HumanY += 6;
		}
	}
	if (e.key === "s" || e.key === "ArrowDown") {
		HumanY += 6;
		if (HumanY >= 500) {
			HumanY -= 6;
		}
	}
	if (e.key === "a" || e.key === "ArrowLeft") {
		HumanX -= 6;
		if (HumanX <= 0) {
			HumanX += 6;
		}
	}
	if (e.key === "d" || e.key === "ArrowRight") {
		HumanX += 6;
		if (HumanX >= 700) {
			HumanX -= 6;
		}
	}

	Distance = Math.sqrt(Math.pow(HumanX - ComputerX, 2) + Math.pow(HumanY - ComputerY, 2))
	
	var HighScore = document.getElementById("HighScore")

	if (Distance <= 60) {
		if (OriginalMinTime === null && OriginalSecTime === null) {
			OriginalSecTime = SecTime;
			OriginalMinTime = MinTime;
			OriginalMillTime = MillTime
		}

		if (OriginalMillTime >= MillTime) {
			OriginalMillTime = MillTime;
		}
		if (OriginalSecTime >= SecTime) {
			OriginalSecTime = SecTime;
		}
		if (OriginalMinTime >= MinTime) {
			OriginalMinTime = MinTime;
		}

		HighScore.innerHTML = String(OriginalMinTime) + ":" + String(OriginalSecTime) + ":" + String(OriginalMillTime);
		
		SecTime = 0; MinTime = 0; MillTime = 0;
		ComputerCircle();
	}
	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	//Computer's Circle
	context.fillStyle = "red";
	context.beginPath();
	context.arc(ComputerX,ComputerY,30,0,2*Math.PI,false);
	context.closePath();
	context.fill();
	
	//Human's Circle
	context.fillStyle = "rgb(33, 66, 99)";
	context.beginPath();
	context.arc(HumanX,HumanY,30,0,2*Math.PI,false);
	context.closePath();
	context.fill();

	console.log(String(Distance));
}

context.arc(125,125,30,0,2*Math.PI,false); // center at (125,125), radius = 30
context.fill();

ComputerCircle();

document.addEventListener("keydown", Level); // function f defined below:

//for animations, you can use:
//setInterval(function, how often to call it)
//let id = setInterval(g, 100) will call function g 10 times per second
// (every 100 milliseconds)
//you save the id so it can be stopped later with clearInterval(id);

/*-----------------------------------------------------------------------------*/
var SecTime = 0, MinTime = 0, MillTime = 0, Distance;

var Time = document.createElement("h3");
var TimeText = document.createTextNode("0:00");
Time.appendChild(TimeText);

document.body.appendChild(Time);

var OriginalSecTime = null, OriginalMinTime = null, OriginalMillTime

function Timer() {
	MillTime += 1;
	if (MillTime > 99) {
		MillTime = 0;
		SecTime += 1;
	}
	if (SecTime > 59) {
		SecTime = 0;
		MinTime += 1;
	}
	TimeText.nodeValue = String(MinTime) + ":" + String(SecTime) + ":" + String(MillTime);
}

var TimerInterval = setInterval(Timer, 10);