const canvas=document.getElementById('test');
canvas.width=600;
canvas.height=600;
const context=canvas.getContext('2d');
let score=0;

if (!(localStorage.alive)) {
    localStorage.alive = true;
}

if (!(localStorage.lives)) {
    localStorage.lives = 3;
}
let types=['red','red','green','green','green','green','green','white']
let fruits={
    x:[],
    y:[],
    jumpcount:[],
    type:[]
};
let player={
    x:300,
    y:300
};
let trail = {
    x: [],
    y: []
};

for (let i = 0; i < 20; ++i) {
    trail.x.push(player.x);
    trail.y.push(player.y);
};
window.onmousemove=(e) => {
    let rect = canvas.getBoundingClientRect();
    player.x = e.clientX - rect.left;
    player.y = e.clientY - rect.top;
};

let moveFruits = setInterval(() => {
    for (let a = 0; a < fruits.x.length; ++a){
        fruits.y[a]-=fruits.jumpcount[a];
        fruits.jumpcount[a]=fruits.jumpcount[a]-0.5
        if (fruits.y[a] > 640 && fruits.type[a] != "red"){
            fruits.x.splice(a,1);
            fruits.y.splice(a,1);
            fruits.jumpcount.splice(a,1);
            fruits.type.splice(a,1);
            localStorage.lives = Number(localStorage.lives)-1;
            document.getElementById("lives").innerHTML = "Lives: " + String(localStorage.lives);
        };
        let distance = Math.sqrt(Math.pow(player.x - fruits.x[a], 2) + Math.pow(player.y - fruits.y[a], 2));
        if (distance <= 25 ) {
            if (fruits.type[a]==='green'){
                score+=1;
                fruits.x.splice(a,1);
                fruits.y.splice(a,1);
                fruits.jumpcount.splice(a,1);
                fruits.type.splice(a,1);
                document.getElementById("score").innerHTML = "Score: " + String(score);
            }else if (fruits.type[a]==='white'){
                score+=3;
                fruits.x.splice(a,1);
                fruits.y.splice(a,1);
                fruits.jumpcount.splice(a,1);
                fruits.type.splice(a,1);
                document.getElementById("score").innerHTML = "Score: " + String(score);
            };
            
        };
    };
}, 30);

let createFruits = setInterval(() => {
    fruits.x.push(Math.floor(Math.random() * 550)+25);
    fruits.y.push(630);
    fruits.jumpcount.push(Math.floor(Math.random()*3+20));
    fruits.type.push(types[Math.floor(Math.random()*types.length)]);
}, 1800);

if (localStorage.alive == "true") {
let game = setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let a = 0; a < fruits.x.length; ++a){
        context.beginPath();
        context.arc(fruits.x[a], Math.floor(fruits.y[a]), 25, 0, 2 * Math.PI);
        context.fillStyle = fruits.type[a];
        context.fill();
    };

    trail.x.unshift(player.x);
    trail.y.unshift(player.y);
    trail.x.pop();
    trail.y.pop();
    context.fillStyle = "rgb(0, 0, 255)";
    for (let i = 0; i < trail.x.length; ++i) {
        context.fillRect(trail.x[i], trail.y[i], 20, 20);
    }
    
    if (Number(localStorage.lives) <= 0) {
        context.fillStyle = "white";
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "40px Arial";
        context.fillText("You Have Died", 300, 300);
        localStorage.alive = "false";
        clearInterval(game);
        clearInterval(moveFruits);
        clearInterval(createFruits);
    }
}, 1);
} else {
    context.fillStyle = "white";
    context.font = "40px Arial";
    document.getElementById("lives").innerHTML = "Lives: 0";
    context.fillText("You Have Died", 300, 300);
    clearInterval(moveFruits);
    clearInterval(createFruits);
}
