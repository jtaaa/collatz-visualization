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

    this.update = function () {
        const branch = new CollatzBranch(context, state, {
            seed: 8,
            prevAngle: Math.PI * 1.02,
            angleStep: Math.PI / 13,
            prevPos: { x: 600, y: state.height },
            lineLength: 30,
            steps: 0,
            maxNum: 100000,
            maxSteps: 40
        });
        branch.draw();
    }
}