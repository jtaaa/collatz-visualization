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
        this.lineWidth = 14;
        this.outlineWidth = 4;
    }

    draw() {
        if (((this.currentNum * 3) - 1) * 2 < this.maxNum){
            this.context.beginPath();
            this.context.moveTo(this.prevPos.x, this.prevPos.y);
        }
        while (this.currentNum < this.maxNum && this.steps < this.maxSteps) {
            let newPos = this.getNewPos();

            // draw the outline ===============================================
            this.context.globalCompositeOperation = 'source-over';
            this.context.lineTo(newPos.x, newPos.y);
            
            this.context.lineWidth = this.lineWidth + this.outlineWidth;
            let outlineColor = new Color();
            outlineColor.setColorRgb(140, 140, 140);
            this.context.strokeStyle = outlineColor.getHex();
            
            this.context.stroke(); // finish drawing outline ==================

            // draw the actual line ===========================================
             this.context.globalCompositeOperation = 'destination-out';
            this.context.lineWidth = this.lineWidth;
            
            this.context.stroke(); // finish drawing line =====================
            
            this.prevPos = newPos;
            
            console.log(this.currentNum);
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
                this.context.moveTo(this.prevPos.x, this.prevPos.y);
            }
            this.currentNum *= 2;
            this.steps += 1;
        }
        console.log('Seed:', this.seed, 'Steps:', this.steps);
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