function onLoad() {
    
    const canvas = document.getElementById('canvas');

    window.onresize = resizeCanvas;
    
    const sceneManager = new SceneManager(canvas, 0);

    resizeCanvas();

    render();

    function render() {
        requestAnimationFrame(render);
    }

    function resizeCanvas() {
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";

        sceneManager.onWindowResize();
        sceneManager.update();
    }
}