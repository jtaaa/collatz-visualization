function onLoad(startValues) {

    const canvas = document.getElementById('canvas');
    const formDiv = document.getElementById('form-div');

    window.onresize = resizeCanvas;
        
    const sceneManager = new SceneManager(canvas, startValues);

    resizeCanvas();

    render();

    function render() {
        requestAnimationFrame(render);
    }

    function resizeCanvas() {
        canvas.style.width = window.innerWidth * 0.75 + "px";
        formDiv.style.width = window.innerWidth * 0.25 + "px";

        canvas.style.height = window.innerHeight + "px";
        formDiv.style.height = window.innerHeight + "px";

        sceneManager.onWindowResize();
        sceneManager.update();
    }
}

function generateFromForm() {
    const formData = new CollatzFormData();
    let startValues = formData.getStartValues();
    onLoad(startValues);
}