const canvas = document.querySelector("#canvas");
canvas.height = 600; // pick whatever dimensions fit on your screen
canvas.width = 800;
const context = canvas.getContext("2d");

//clears canvas
function clear(){
    let temp = context.fillStyle;
    context.fillStyle = "rgb(255, 255, 255)";
    context.fillRect(0,0, canvas.width, canvas.height);
    context.fillStyle = temp;
}

clear();

var OriginalPosition = {
    x: 0,
    y: 0
}

var FuturePosition = {
    x: 100,
    y: 600
}

var ang = Math.atan2((FuturePosition.y - OriginalPosition.y), (FuturePosition.x - OriginalPosition.x)) * 180 / Math.PI;
var NewAng = 180 - ang;

console.log(String(ang))

context.moveTo(OriginalPosition.x, OriginalPosition.y);
context.lineTo(FuturePosition.x, FuturePosition.y);
context.stroke();