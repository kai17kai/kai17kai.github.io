const canvas = document.getElementById('canvas');
canvas.height = 300;
canvas.width = 300;
const context = canvas.getContext("2d");

let grid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

const colors = 	["orange", "aquamarine", "green", "blue", "blueviolet", "brown"];

for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
        grid[i][j] = Math.floor(Math.random() * 6);
    }
}

draw();

var PositionColor = grid[9][9];

var positions = {
    x: 9,
    y: 9
}

grid[9][9] = -1;

var PlayerPos = {
    x: 9,
    y: 9
}

draw();

function move(event) {
    if (event.key === "w") {
        if (PlayerPos.y > 0) {
            grid[PlayerPos.x][PlayerPos.y] = PositionColor;
            PlayerPos.y -= 1;
            PositionColor = grid[PlayerPos.x][PlayerPos.y];
            grid[PlayerPos.x][PlayerPos.y] = -1;
        }
    }
    if (event.key === "s") {
        if (PlayerPos.y < 9) {
            grid[PlayerPos.x][PlayerPos.y] = PositionColor;
            PlayerPos.y += 1;
            PositionColor = grid[PlayerPos.x][PlayerPos.y];
            grid[PlayerPos.x][PlayerPos.y] = -1;
        }
    }
    if (event.key === "d") {
        if (PlayerPos.x < 9) {
            grid[PlayerPos.x][PlayerPos.y] = PositionColor;
            PlayerPos.x += 1;
            PositionColor = grid[PlayerPos.x][PlayerPos.y];
            grid[PlayerPos.x][PlayerPos.y] = -1;
        }
    }
    if (event.key === "a") {
        if (PlayerPos.x > 0) {
            grid[PlayerPos.x][PlayerPos.y] = PositionColor;
            PlayerPos.x -= 1;
            PositionColor = grid[PlayerPos.x][PlayerPos.y];
            grid[PlayerPos.x][PlayerPos.y] = -1;
        }
    }
}

function draw() {
    let t1 = canvas.width / 10;
    let t2 = t1 / 4;
    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 10; ++j) {
            let x = i * t1;
            let y = j * t1;
            let number = grid[i][j];
            if (number >= 0) { 
                context.fillStyle = colors[number]
                context.fillRect(x, y, t1, t1);
            } else {
                context.fillStyle = "rgb(130, 42, 42)";
                context.fillRect(x + t2, y + t2, 15, 15);
            }
        }
    }
}

document.addEventListener("keydown", (e) => {
    move(e);
    draw();
})