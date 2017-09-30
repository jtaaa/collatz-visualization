class CollatzFormData {

    constructor() {
        this.formData = {
            seed: document.getElementById('seed'),
            prevAngle: document.getElementById('prev-angle'),
            angleStep: document.getElementById('angle-step'),
            prevPos: { x: document.getElementById('prev-x'), y: document.getElementById('prev-y') },
            lineLength: document.getElementById('line-length'),
            steps: document.getElementById('steps'),
            maxNum: document.getElementById('max-num'),
            maxSteps: document.getElementById('max-steps')
        }
    }

    validateForm() {
        // placeholder
        console.log(formData);
        return true;
    }

    getStartValues() {
        if (!this.validateForm) { return null; }
        let startValues = {};
        for (var key in this.formData) {
            if (this.formData.hasOwnProperty(key) && key != 'prevPos') {
                startValues[key] = parseFloat(this.formData[key].value);
            }
            startValues['prevPos'] = {
                x: parseFloat(this.formData.prevPos.x.value),
                y: parseFloat(this.formData.prevPos.y.value)
            };
        }
        return startValues;
    }

}