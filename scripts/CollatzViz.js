function CollatzViz(context, state, seed) {
    this.currentNum = seed;
    this.steps = 0;
    this.prevAngle = Math.PI * 3 / 2;
    this.angleStep = Math.PI / 40;
    this.prevPos = { x: 10, y: state.height };
    this.lineLength = 30;

    this.leftTurns = 0;

    this.draw = function() {
        while (this.currentNum !== 1 && this.steps < 50) {
            context.beginPath();
            context.moveTo(this.prevPos.x, this.prevPos.y);
            let newPos = this.getNewPos();
            context.lineTo(newPos.x, newPos.y);
            this.prevPos = newPos;
            context.lineWidth = getRandom(6, 15);
            let color = new Color();
            color.setColorRgb(this.currentNum % 255, 70, 70);
            context.strokeStyle = color.getHex();
            context.stroke();
            if (this.currentNum % 2 === 1) {
                this.currentNum = this.currentNum * 3 + 1;
            } else {
                this.currentNum /= 2;
            }
            this.steps += 1;
        }
        console.log('Seed:', seed, 'Steps:', this.steps, 'Left turns:', this.leftTurns);
    }

    this.getNewPos = function() {
        let angle = this.prevAngle;
        if (this.currentNum % 2 === 1) {
            angle += -this.angleStep;
            this.leftTurns += 1;
        } else {
            angle += this.angleStep;
        }
        let x = this.prevPos.x + this.lineLength * Math.cos(angle);
        let y = this.prevPos.y + this.lineLength * Math.sin(angle);
        this.prevAngle = angle;
        return { x, y};
    }
}