var gl;

function setupGL(canvas) {

    var names = ["webgl", "experimental-webgl"];
    var context = null;

    for (var i = 0; i < names.length; i++) {
        try {
            context = canvas.getContext(names[i]);
        } catch (e) { }

        if (context) {
            break;
        }
    }

    if (context) {
        context.viewportWidth = canvas.width;
        context.viewportHeight = canvas.height;
        gl = context;
    } else {
        alert("Failed to create a WebGL Context");
    }
}

function animate() {
    Timer();
}

function tick() {
    requestAnimationFrame(tick);

    DrawScene();
    handleKeys();

    animate();
}

function webGLStart() {
    var canvas = document.getElementById("gameCanvas");
    setupGL(canvas);
    setupShaders();

    Square.Init(gl);

    initTexture();

    gl.clearColor(0.39, 0.58, 0.93, 1.0);
    gl.clearDepth(1.0);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    tick();
}