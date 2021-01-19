"use strict";

const canvas = document.getElementById("canvas");

window.addEventListener("resize", draw_canvas);
function draw_canvas(){
	let square_side = Math.min(window.innerWidth, window.innerHeight) - 60;
	square_side -= square_side%8; 
	canvas.setAttribute('width', square_side.toString()); 
    canvas.setAttribute('height',square_side.toString());
}

draw_canvas();