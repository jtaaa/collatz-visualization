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
let vec = { xa: 4, ya: height, x: 4, y: height, mag: 50, dir: Math.PI / 2 }
let vec2 = { xa: 4, ya: height, x: 4, y: height, mag: 50, dir: Math.PI / 2.1 }
let vec3 = { xa: 4, ya: height, x: 4, y: height, mag: 50, dir: Math.PI / 2.1 }
let vec4 = { xa: 4, ya: height, x: 4, y: height, mag: 40, dir: Math.PI / 1.9 }
let vec5 = { xa: 4, ya: height, x: 4, y: height, mag: 53, dir: Math.PI / 2.2 }

function drawCurve(vec, offsetDeg, dampFactor, length, speed) {
    ctx.moveTo(vec.x, vec.y);
    vec = nextVec(vec, offsetDeg);
    let xc = vec.x;
    let yc = vec.y;
    let oldxc;
    let oldyc;
    let currentNumber = 0;
    let timoutID = setInterval(() => {
        console.log(vec);
        let newVec = nextVec(vec, offsetDeg);
        oldxc = xc;
        oldyc = yc;
        xc = (vec.x + newVec.x) / 2;
        yc = (vec.y + newVec.y) / 2;
        offsetDeg *= dampFactor;

        ctx.beginPath();
        ctx.moveTo(Math.floor(oldxc), Math.floor(oldyc));
        ctx.quadraticCurveTo(Math.floor(vec.x), Math.floor(vec.y), Math.floor(xc), Math.floor(yc));
        ctx.lineWidth = 12;
        ctx.strokeStyle = 'grey';
        ctx.stroke();

        // line color
        ctx.beginPath();
        ctx.moveTo(Math.floor(oldxc), Math.floor(oldyc));
        ctx.quadraticCurveTo(Math.floor(vec.x), Math.floor(vec.y), Math.floor(xc), Math.floor(yc));
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'white';
        ctx.stroke();

        vec = newVec;
        currentNumber += 1;
        if (currentNumber > length) {
            clearInterval(timoutID);
        }
    }, speed);
}
drawCurve(vec, -0.05, 1.023, 200, 50);
drawCurve(vec2, -0.05, 1.023, 200, 50);
drawCurve(vec3, -0.04, 1.023, 200, 50);
drawCurve(vec4, -0.05, 1.023, 100, 50);
drawCurve(vec5, -0.05, 1.03, 150, 50);


function nextVec(vec, offsetDeg) {
    let theta = null;
    let offsetX = null;
    let offsetY = null;
    let offsetXA = null;
    let offsetYA = null;
    if (vec.dir <= Math.PI / 2) {
        // First quadrant
        theta = vec.dir;
        const CONNECTION_OFFSET = 1 - Math.sin(theta * 2) / 15;
        console.log(CONNECTION_OFFSET);
        offsetXA = Math.cos(theta) * vec.mag * CONNECTION_OFFSET;
        offsetYA = Math.sin(theta) * vec.mag * CONNECTION_OFFSET;
        offsetX = Math.cos(theta) * vec.mag;
        offsetY = Math.sin(theta) * vec.mag;
    } else if (vec.dir <= Math.PI) {
        // Second quadrant
        theta = vec.dir - Math.PI / 2;
        const CONNECTION_OFFSET = 1 -  Math.sin(theta * 2) / 15;
        console.log(CONNECTION_OFFSET);
        offsetXA = -Math.sin(theta) * vec.mag * CONNECTION_OFFSET;
        offsetYA = Math.cos(theta) * vec.mag * CONNECTION_OFFSET;
        offsetX = -Math.sin(theta) * vec.mag;
        offsetY = Math.cos(theta) * vec.mag;
    } else if (vec.dir <= Math.PI * 3 / 2) {
        // Third quadrant
        theta = vec.dir - Math.PI;
        const CONNECTION_OFFSET = 1 - Math.sin(theta * 2) / 15;
        console.log(CONNECTION_OFFSET);
        offsetXA = -Math.cos(theta) * vec.mag * CONNECTION_OFFSET;
        offsetYA = -Math.sin(theta) * vec.mag * CONNECTION_OFFSET;
        offsetX = -Math.cos(theta) * vec.mag;
        offsetY = -Math.sin(theta) * vec.mag;
    } else {
        // Fourth quadrant
        theta = vec.dir - Math.PI * 3 / 2;
        const CONNECTION_OFFSET = 1 - Math.sin(theta * 2) / 15;
        console.log(CONNECTION_OFFSET);
        offsetXA = Math.sin(theta) * vec.mag * CONNECTION_OFFSET;
        offsetYA = -Math.cos(theta) * vec.mag * CONNECTION_OFFSET;
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
        xa: vec.x + offsetXA,
        ya: vec.y - offsetYA,
        x: vec.x + offsetX,
        y: vec.y - offsetY,
        mag: vec.mag,
        dir: newDir
    }
}
