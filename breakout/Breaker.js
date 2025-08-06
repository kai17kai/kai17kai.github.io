"use strict";

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    Events = Matter.Events;

var runner = Runner.create();

// create an engine and set up world
var engine = Engine.create();
engine.gravity.y = 0;

// create a renderer and set up context for canvas
const canvas = document.getElementById("canvas");
var render = Render.create({
    canvas: canvas,
    engine: engine
});
const context = canvas.getContext("2d");
var death = true;

function Start() {
    //creates obstacles
    var Obstacles = new Array();
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 9; j++) {
            Obstacles.push(Bodies.rectangle(80 + 80 * j, 50 + 65 * i, 50, 10, { 
                isStatic: true,
                label: "obstacle",
                friction: 0
            }))
        }
    }

    //creates Player
    var Player = Bodies.rectangle(375, 500, 60, 10, {
        isStatic: true,
        label: "player",
        friction: 0
    });

    //creates pong
    var Pong = Bodies.rectangle(Math.floor(Math.random() * 801), 350, 10, 10, {
        inertia: Infinity,
        friction: 0
    });
    var velocity = Matter.Vector.create(2, 2);
    velocity.x *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
    Matter.Body.setVelocity(Pong, velocity);

    //creates walls
    var walls = new Array();
    walls.push(Bodies.rectangle(canvas.width / 2, canvas.height, canvas.width, 10, {isStatic: true, label: "bottom"}));
    walls.push(Bodies.rectangle(canvas.width, canvas.height / 2, 10, canvas.height, {isStatic: true, label: "right"}));
    walls.push(Bodies.rectangle(canvas.width / 2, 0, canvas.width, 10, {isStatic: true, label: "top"}));
    walls.push(Bodies.rectangle(0, canvas.height / 2, 10, canvas.height, {isStatic: true, label: "left"}));

    // add obstacles and player to the world
    Composite.add(engine.world, Obstacles);
    Composite.add(engine.world, [Player, Pong]);
    Composite.add(engine.world, walls);

    //deal with score
    var score = 0;

    function highScore(score) {
        var saved = 0;
        try { saved = parseFloat(localStorage.breakHighScore); } catch (e) { saved = 0; }
        if (!(typeof score === 'undefined')) {
            try { score = parseFloat(score); } catch (e) { score = 0; }
            if (score>saved) {
                saved = score;
                localStorage.breakHighScore = '' + score;
            }
        }
        if (isNaN(saved)) {
            saved = 0;
            localStorage.breakHighScore = '0';
        }
        return saved;
    }

    const currentScoreText = document.getElementById("score");
    const currentHighScore = document.getElementById("old");
    currentScoreText.innerText = "Score: " + score;
    currentHighScore.innerText = "High Score: " + highScore(score);

    // run the renderer
    Render.run(render);

    // run the engine
    Runner.run(runner, engine);

    //Controls and Events
    var mouse = Mouse.create(render.canvas);
    Events.on(engine, 'afterUpdate', () => {
        Matter.Body.setPosition(Player, {
            x: mouse.position.x,
            y: 500
        });
        Matter.Body.setVelocity(Pong, velocity);
    });

    Events.on(engine, 'collisionStart', (event) => {
        for (let i = 0; i < event.pairs.length; ++i) {
            let pair = event.pairs[i];
            let normal = pair.collision.normal;
            if (normal.x === 0) {
                normal.x = 0;
            }
            if (normal.y === 0) {
                normal.y = 0;
            }
            if (pair.bodyA.label === "obstacle") {
                Composite.remove(engine.world, pair.bodyA);
                if (normal.x != 0) {
                    velocity.x = Math.sign(normal.x) * -2;
                }
                if (normal.y != 0) {
                    velocity.y = Math.sign(normal.y) * -2;
                }
                Matter.Body.setVelocity(Pong, velocity);

                score++;
                currentScoreText.innerText = "Score: " + score;
                currentHighScore.innerText = "High Score: " + highScore(score);
            } else if (pair.bodyA.label === "player") {
                if (normal.x != 0) {
                    velocity.x = Math.sign(normal.x) * -2;
                }
                if (normal.y != 0) {
                    velocity.y = Math.sign(normal.y) * -2;
                }
                Matter.Body.setVelocity(Pong, velocity);
            } else if (pair.bodyA.label === "top" || pair.bodyB.label === "top") {
                velocity.y = 2;
                Matter.Body.setVelocity(Pong, velocity);
                console.log(velocity);
                console.log("top");
            } else if (pair.bodyA.label === "right" || pair.bodyB.label === "right") {
                velocity.x = -2;
                Matter.Body.setVelocity(Pong, velocity);
                console.log("right");
            } else if (pair.bodyA.label === "left" || pair.bodyB.label === "left") {
                velocity.x = 2;
                Matter.Body.setVelocity(Pong, velocity);
                console.log("left");
            } else if (pair.bodyA.label === "bottom" || pair.bodyB.label === "bottom") {
                Death();
                console.log("bottom");
            }
        }
    });
}

function Death() {
    Render.stop(render);
    Runner.stop(runner);
    Matter.World.clear(engine.world, false);
    Engine.clear(engine);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.font = "40px Arial";
    context.fillText("You died", 350, 300);
    death = true;
}

function Timer() {
    if (death) {
        death = false;
    } else {
        return;
    }
    let seconds = 5;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.font = "40px Arial";
    context.fillText(seconds.toString(), 350, 300);
    let ID = setInterval(() => {
        seconds -= 1;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";
        context.font = "40px Arial";
        context.fillText(seconds.toString(), 350, 300);
        if (seconds == 0) {
            Start();
            clearInterval(ID);
        }
    }, 1000);
}

context.fillStyle = "white";
context.font = "40px Arial";
context.fillText("Press Space To Start", 200, 300);
let done = false;
document.onkeydown = (e) => {
    if (e.key == " " && done === false) {
        e.preventDefault();
        Timer();
        done = true;
    }
}