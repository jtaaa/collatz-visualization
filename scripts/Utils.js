/**
 * [getPixelRatio Given a canvas 2D context returns a pixel ratio]
 * @param  {[canvas context]} context [convas 2D context]
 * @return {[number]}         [pixelRatio]
 */
function getPixelRatio(context) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 
        1;

    return devicePixelRatio / backingStoreRatio;
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}