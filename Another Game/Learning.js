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

var OriginalPosition = (0, 0);
context.moveTo(0, 0);
context.lineTo(100, 800);
context.stroke();
