const canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 800;
var context = canvas.getContext("2d");

var Bullets = new Array();

class Player {
    x = 10
    y = 370
    Ammo = 5
    get Shoot() {
        this.Ammo -= 1;
    }
}

var x = new Player();
document.onkeypress = (e) => {
    if (e.key == "w" || e.key == "ArrowUp") {
        x.y -= 10;
        if (x.y <= -10) {
            x.y += 10;
        }
    }
    if (e.key == "s" || e.key == "ArrowDown") {
        x.y += 10;
        if (x.y >= canvas.height) {
            x.y -= 10;
        }
    }
    if (e.key == " ") {
    }
    console.log(x.x);
    console.log(x.y);
}