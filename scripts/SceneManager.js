function SceneManager(canvas, tree) {
	
	const state = {
        pixelRatio: -1,

        width: -1,
        height: -1
    }

    const context = canvas.getContext('2d');
    state.pixelRatio = getPixelRatio(context);

    this.onWindowResize = function() {
        var width = window.innerWidth * state.pixelRatio;
        var height = window.innerHeight * state.pixelRatio;

        canvas.setAttribute('width', Math.round(width));
        canvas.setAttribute('height', Math.round(height));

        state.width = width;
        state.height = height;
    }
    this.onWindowResize();

    const points = 2;

    const viz = new CollatzViz(context, state, points);

    this.update = function () {

        viz.draw();
    }
}