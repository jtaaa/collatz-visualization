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
