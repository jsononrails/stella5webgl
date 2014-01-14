jewel.display = (function() {
	var dom = jewel.dom,
		webgl = jewel.webgl,
		$ = dom.$,
		canvas, gl,
		cursor,
		cols, rows,
		animations = [],
		previousCycle,
		firstRun = true,
		jewels,
		program,
		geometry,
		aVertex, aNormal,
		uScale, uColor;
		
	function initialize(callback) {
		if(firstRun) {
			setup();
			firstRun = false;
		}
		
		requestAnimationFrame(cycle);
		callback();
	}
	
	function setup() {
		var boardElements = $("#game-screen .game-board")[0];
		
		cols = jewels.settings.cols;
		rows = jewels.settings.rows;
		jewels = [];
		
		canvas = document.createElement("canvas");
		gl = canvas.getContex("experimental-webgl");
		dom.addClass(canvas, "board");
		canvas.width = cols * jewels.settings.jewelSize;
		canvas.height = rows * jewels.settings.jewelSize;
		
		boardElements.appendChild(canvas);
		setupGL();
	}
	
	function setCursor(x, y, selected) {
		cursor = null;
		if(arguments.length >0) {
			curstor = {
				x: x,
				y: y,
				selected: selected
			}
		}
	}
	
	function setupGL() {
		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
		
		program = setupShaders();
		setupTexture();
		gl.useProgram(program);
		
		aVertext = gl.getAttribLocation(program, "aVertex");
		aNormal = gl.getAttribLocation(program, "aNormal");
		uScale = gl.getUniformLocation(program, "uScale");
		uColor = gl.getUniformLocation(program, "uColor");
		
		gl.enableVertexAttribArray(aVertex);
		gl.enableVertexAttribArray(aNormal);
		
		gl.uniform1f(
			gl.getUniformLocation(program, "uAmbient"),
			0.12
		);
		
		gl.uniform3f(
			gl.getUniformLocation(program," uLightPosition"),
			20, 15, -10
		);
		
		webgl.loadModel(gl, "/jewelwarrior/models/jewel.dae", function(geom) {
			geometry = geom;
		});
		
		webgl.setProjection(g, program, 60, cols/rows, 0.1, 100);
	}
	
	function levelUp() {}
	function gameOver() {}
	
	function redraw(newJewels, callback) {
		var x, y,
			jewel, type;
		
		for(x=0; x<cols; x++) {
			for(y=0; y<rows; y++) {
				type = newJewels[x][y];
				jewel = getJewel(x, y);
				if(jewel) {
					jewel.type = type;
				} else {
					createJewel(x, y, type);
				}
			}
		}
		callback();
	}
	
	function moveJewels() {}
	function removeJewels() {}
	
	function createJewel(x,y, type) {
		var jewel = {
			x: x,
			y: y,
			type: type,
			rnd: Math.random() * 2 - 1,
			scale: 1
		};
		
		jewels.push(jewel);
		return jewel;
	}
	
	function getJewel(x, y) {
		return jewels.filter(function(j) {
			return j.x == x && j.y == y
		})[0];
	}
	
	function addAnimation(runTime, fncs) {
        var anim = {
            runTime : runTime,
            startTime : Date.now(),
            pos : 0,
            fncs : fncs
        };
        animations.push(anim);
    }

    function renderAnimations(time, lastTime) {
        var anims = animations.slice(0), // copy list
            n = anims.length,
            animTime,
            anim,
            i;

        // call before() function
        for (i=0;i<n;i++) {
            anim = anims[i];
            if (anim.fncs.before) {
                anim.fncs.before(anim.pos);
            }
            anim.lastPos = anim.pos;
            animTime = (lastTime - anim.startTime);
            anim.pos = animTime / anim.runTime;
            anim.pos = Math.max(0, Math.min(1, anim.pos));
        }

        animations = []; // reset animation list

        for (i=0;i<n;i++) {
            anim = anims[i];
            anim.fncs.render(anim.pos, anim.pos - anim.lastPos);
            if (anim.pos == 1) {
                if (anim.fncs.done) {
                    anim.fncs.done();
                }
            } else {
                animations.push(anim);
            }
        }
    }
	
	
	return {
		initialize: initialize,
		redraw: redraw,
		setCursor: setCursor,
		moveJewels: moveJewels,
		removeJewels: removeJewels,
		refill: redraw,
		levelUp: levelUp,
		gameOver: gameOver
	};
	
})();