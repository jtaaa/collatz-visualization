function CollatzViz(context, state, seed) {
    
    this.currentNum = seed;
    this.prevAngle = Math.PI * 3 / 2;
    this.angleStep = Math.PI / 10;
    this.prevPos = { x: 500, y: 800 };
    this.lineLength = 50;

    this.draw = function() {
        while (this.currentNum < 100) {
            context.beginPath();
            context.moveTo(this.prevPos.x, this.prevPos.y);
            let newPos = this.getNewPos();
            context.lineTo(newPos.x, newPos.y);
            this.prevPos = newPos;
            context.stroke();
            this.currentNum += 1;
        }
    }

    this.getNewPos = function() {
        let angle = this.prevAngle;
        if (this.currentNum % 8 > 5) {
            angle += -this.angleStep;
        } else {
            angle += this.angleStep;
        }
        let x = this.prevPos.x + this.lineLength * Math.cos(angle);
        let y = this.prevPos.y + this.lineLength * Math.sin(angle);
        this.prevAngle = angle;
        return { x, y};
    }
}