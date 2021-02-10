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
    y:500
};
window.onmousemove=(e) => {
    let rect = canvas.getBoundingClientRect();
    player.x = e.clientX - rect.left;
    player.y = e.clientY - rect.top;
};


function dead (){
    for (a=0;a<enemies.x.length;a++){
        console.log('it isnt ready yet')
    };
};

let CreateObstacles = setInterval(() => {
    enemies.x.push(Math.floor(Math.random() * 600));
    enemies.y.push(-10);
    enemies.r.push(Math.floor(Math.random() * 5 + 10));
}, 100);

setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(dodger, player.x, player.y);
    
    for (a=0;a<enemies.x.length;a++){
        context.beginPath();
        context.arc(enemies.x[a], enemies.y[a], enemies.r[a], 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.fill();
        enemies.y[a]=enemies.y[a]+2;
        if (enemies.y[a]>canvas.height+20){
            enemies.y.splice(a,1)
            enemies.x.splice(a,1)
            enemies.r.splice(a,1)
        };
    };
}, 16);