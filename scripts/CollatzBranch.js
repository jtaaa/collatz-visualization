class CollatzBranch{
    
    constructor(context, state, startValues) {
        this.context = context;
        this.state = state;
        this.seed = startValues.seed;
        this.currentNum = this.seed;
        this.prevAngle = startValues.prevAngle;
        this.angleStep = startValues.angleStep;
        this.prevPos = startValues.prevPos;
        this.lineLength = startValues.lineLength;
        this.steps = startValues.steps;
        this.maxNum = startValues.maxNum;
        this.maxSteps = startValues.maxSteps;
    }

    draw() {
        while (this.currentNum < this.maxNum && this.steps < this.maxSteps) {
            let newPos = this.getNewPos();

            // draw the outline ===============================================
            this.context.beginPath();
            this.context.moveTo(this.prevPos.x, this.prevPos.y);
            this.context.lineTo(newPos.x, newPos.y);
            
            this.context.lineWidth = 18;
            let outlineColor = new Color();
            outlineColor.setColorRgb(140, 140, 140);
            this.context.strokeStyle = outlineColor.getHex();
            
            this.context.stroke(); // finish drawing outline ==================

            // draw the actual line ===========================================
            this.context.beginPath();
            this.context.moveTo(this.prevPos.x, this.prevPos.y);
            this.context.lineTo(newPos.x, newPos.y);
            
            this.context.lineWidth = 14;
            let color = new Color();
            color.setColorRgb(70 + (this.currentNum / 100) % 135, 70, 70);
            this.context.strokeStyle = color.getHex();
            
            this.context.stroke(); // finish drawing line =====================
            
            this.prevPos = newPos;
            
            if (this.currentNum % 6 === 4) {
                let newBranch = new CollatzBranch(this.context, this.state, {
                    seed: (this.currentNum - 1) / 3,
                    prevAngle: this.prevAngle,
                    angleStep: this.angleStep,
                    prevPos: this.prevPos,
                    lineLength: this.lineLength,
                    steps: this.steps,
                    maxNum: this.maxNum,
                    maxSteps: this.maxSteps
                });
                newBranch.draw();
            }
            this.currentNum *= 2;
            this.steps += 1;
        }
    }

    getNewPos() {
        let angle = this.prevAngle;
        if (this.currentNum % 2 === 1) {
            angle += -this.angleStep - 0.1;
            this.leftTurns += 1;
        } else {
            angle += this.angleStep;
        }
        let x = this.prevPos.x + this.lineLength * Math.cos(angle);
        let y = this.prevPos.y + this.lineLength * Math.sin(angle);
        this.prevAngle = angle;
        return { x, y };
    }
}