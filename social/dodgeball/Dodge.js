const canvas=document.getElementById('test');
canvas.width=600;
canvas.height=600;
const context=canvas.getContext('2d');
let end=true;
let count=0;
let test=-10
const dodger = document.createElement("img");
dodger.src = "dodger guy.png";
let enemies={
    x:[],
    y:[],
    r:[]
};
let player={
    x:300,
    y:500,
    
};

window.onmousemove=(e) => {
    let rect = canvas.getBoundingClientRect();
    player.x = e.clientX - rect.left - 16;
    player.y = e.clientY - rect.top - 12;

    if (player.x + 20 > canvas.width) {
        player.x = canvas.width - 20;
    };
    if (player.x < -10) {
        player.x = 0;
    };
    if (player.y < -10) {
        player.y = 0;
    };
    if (player.y + 20 > canvas.height) {
        player.y = canvas.height - 20;
    };

    let MiddleX = player.x + (dodger.width / 2);
    let MiddleY = player.y + (dodger.height / 2);
    for (let i = 0; i < enemies.x.length; ++i) {
        let distance = Math.sqrt(Math.pow(MiddleX - enemies.x[i], 2) + Math.pow(MiddleY - enemies.y[i], 2));
        if (distance < 20) {
            clearInterval(interval);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.font = "40px Arial";
            context.fillText("You Have Died", 150, 300);
        };
    };
};

let CreateObstacles = setInterval(() => {
    enemies.x.push(Math.floor(Math.random() * 600));
    enemies.y.push(-10);
    enemies.r.push(Math.floor(Math.random() * 5 + 15));
}, 120);

let interval = setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(dodger, player.x, player.y);
    
    for (a=0;a<enemies.x.length;a++){
        context.beginPath();
        context.arc(enemies.x[a], enemies.y[a], enemies.r[a], 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.fill();
        enemies.y[a]=enemies.y[a]+1;
        if (enemies.y[a]>canvas.height+30){
            enemies.y.splice(a,1)
            enemies.x.splice(a,1)
            enemies.r.splice(a,1)
        };
    };
}, 1);