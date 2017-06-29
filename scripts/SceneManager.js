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
    
    const branches = [];
    branches.push(new CollatzBranch(context, state, {
        //     this.seed = startValues.seed;
        // this.currentNum = this.seed;
        // this.prevAngle = startValues.prevAngle;
        // this.angleStep = startValues.angleStep;
        // this.prevPos = startValues.prevPos;
        // this.lineLength = startValues.lineLength;
        // this.steps = startValues.steps;
        seed: 8,
        prevAngle: Math.PI * 1.02,
        angleStep: Math.PI / 13,
        prevPos: { x: 600, y: state.height },
        lineLength: 30,
        steps: 0,
        maxNum: 100000,
        maxSteps: 40
    }));

    this.update = function () {
        for (let branch of branches) {
            branch.draw();
        }
    }
}