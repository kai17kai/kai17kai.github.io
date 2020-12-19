const canvas = document.querySelector("#canvas");
canvas.height = 600; // pick whatever dimensions fit on your screen
canvas.width = 800;
const context = canvas.getContext("2d");

//clears canvas
function clear(){
    let temp = context.fillStyle;
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0,0, canvas.width, canvas.height);
    context.fillStyle = temp;
}

clear();

context.fillStyle = "rgb(255, 255, 255)"
context.fillRect(10, 10, 10, 10);
context.fillRect(400, 500, 50, 10)

var x = 400;
function Movement(e) {
    if (e.key === "d") {
        x += 10;
        if (x > 750) {
            x -= 10;
        }
    } else if (e.key === "a") {
        x -= 10;
        if (x < 0) {
            x += 10
        }
    }

    console.log(String(x));
    clear();
    context.fillRect(x, 500, 50, 10);
}

document.addEventListener("keydown", Movement);

