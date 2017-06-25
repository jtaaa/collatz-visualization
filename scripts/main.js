const body = document.getElementsByTagName('body')[0];
// this is the canvas we draw everything on
const canvas = document.createElement('canvas');
// set the canvas to be fullscreen
let width  = body.offsetWidth;
let height = body.offsetHeight;
canvas.setAttribute('width',  width);
canvas.setAttribute('height', height);
console.log('Window width: ', width, ', and Window height: ', height);

// append canvas to the body
body.appendChild(canvas);

// get context
const ctx = canvas.getContext('2d');
let currentNumber = 0;
let vec = { x: 4, y: height, mag: 30, dir: Math.PI / 2 }
let offsetDeg = -0.03;

while (currentNumber < 10000) {
    console.log(vec);
    ctx.beginPath();
    ctx.moveTo(vec.x, vec.y);
    const DAMPING_FACTOR = 1.03;
    offsetDeg *= DAMPING_FACTOR;
    console.log(offsetDeg);
    let newVec = nextVec(vec, offsetDeg);
    ctx.lineTo(newVec.x, newVec.y);
    ctx.lineWidth = 10;

    // set line color
    ctx.strokeStyle = 'white';
    ctx.stroke();

    vec = newVec;
    currentNumber += 90;
}

function nextVec(vec, offsetDeg) {
    let theta = null;
    let offsetX = null;
    let offsetY = null;
    if (vec.dir <= Math.PI / 2) {
        // First quadrant
        theta = vec.dir;
        offsetX = Math.cos(theta) * vec.mag;
        offsetY = Math.sin(theta) * vec.mag;
    } else if (vec.dir <= Math.PI) {
        // Second quadrant
        theta = vec.dir - Math.PI / 2;
        offsetX = -Math.sin(theta) * vec.mag;
        offsetY = Math.cos(theta) * vec.mag;
    } else if (vec.dir <= Math.PI * 3 / 2) {
        // Third quadrant
        theta = vec.dir - Math.PI;
        offsetX = -Math.cos(theta) * vec.mag;
        offsetY = -Math.sin(theta) * vec.mag;
    } else {
        // Fourth quadrant
        theta = vec.dir - Math.PI * 3 / 2;
        offsetX = Math.sin(theta) * vec.mag;
        offsetY = -Math.cos(theta) * vec.mag;
    }
    let newDir = vec.dir + offsetDeg;
    console.log(newDir);
    if (newDir > Math.PI * 2) {
        newDir -= Math.PI * 2;
    } else if (newDir < 0) {
        newDir = Math.PI * 2 + newDir;
    }
    return { 
        x: vec.x + offsetX,
        y: vec.y - offsetY,
        mag: vec.mag,
        dir: newDir
    }
}
