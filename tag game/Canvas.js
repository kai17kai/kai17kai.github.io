const canvas = document.querySelector("#canvas");
canvas.height = 600; // pick whatever dimensions fit on your screen
canvas.width = 800;
const context = canvas.getContext("2d");

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

//Set Color
context.fillStyle = "rgb(33,66,99)";

//Creates computer circle
var ComputerX, ComputerY;

function ComputerCircle() {
	ComputerX = Math.floor(Math.random() * 800) + 1;
	ComputerY = Math.floor(Math.random() * 600) + 1;
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
		if (HumanY >= 600) {
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
		if (HumanX >= 800) {
			HumanX -= 6;
		}
	}

	Distance = Math.sqrt(Math.pow(HumanX - ComputerX, 2) + Math.pow(HumanY - ComputerY, 2))
	
	var TimeTaken = document.getElementById("HighScore")

	if (Distance <= 60) {
		if (OriginalMinTime === null && OriginalSecTime === null) {
			OriginalSecTime = SecTime;
			OriginalMinTime = MinTime;
		}

		if (OriginalMinTime >= MinTime && OriginalSecTime >= SecTime) {
			if (SecTime < 10) {
				TimeTaken.innerHTML = String(MinTime) + ":0" + String(SecTime);
			} else {
				TimeTaken.innerHTML = String(MinTime) + ":" + String(SecTime);
			}
			OriginalSecTime = SecTime;
			OriginalMinTime = MinTime
		} else {
			if (OriginalSecTime < 10) {
				TimeTaken.innerHTML = String(OriginalMinTime) + ":0" + String(OriginalSecTime);
			} else {
				TimeTaken.innerHTML = String(OriginalMinTime) + ":" + String(OriginalSecTime);
			}
		}
		
		SecTime = 0; MinTime = 0;
		ComputerCircle();
	}

	var temp = context.fillStyle;

	context.fillStyle = "white";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	
	//Computer's Circle
	context.fillStyle = "red";
	context.beginPath();
	context.arc(ComputerX,ComputerY,30,0,2*Math.PI,false);
	context.closePath();
	context.fill();
	context.fillStyle = temp;
	
	//Human's Circle
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
var SecTime = 0, MinTime = 0, Distance;

var Time = document.createElement("h3");
var TimeText = document.createTextNode("0:00");
Time.appendChild(TimeText);

document.body.appendChild(Time);

var OriginalSecTime = null, OriginalMinTime = null

function Timer() {
	SecTime += 1;
	if (SecTime > 59) {
		SecTime = 0;
		MinTime += 1;
	}
	if (SecTime < 10) {
		TimeText.nodeValue = String(MinTime) + ":0" + String(SecTime);
	} else {
		TimeText.nodeValue = String(MinTime) + ":" + String(SecTime);
	}
}

var TimerInterval = setInterval(Timer, 1000);