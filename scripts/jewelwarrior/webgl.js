jewel.webgl = (function() {
	
	function createShaderObject(gl, shaderType, source) {
		var shader = gl.createShader(shaderType);
		gl.shaderSource = (shader, source);
		gl.compileShader(shader);
		
		if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			throw gl.getShaderInfoLog(shader);
		}
		
		return shader;
		
	}
	
	function createProgramObject(gl, vs, fs) {
		var program = gl.createProgram();
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.linkProgram(program);
		
		if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			throw gl.getProgramInfoLog(program);
		}
		
		return program;
	}
	
	function createFloatBuffer(gl, data) {
		var buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
		
		return buffer;
	}
	
	function createIndexBuffer(gl, data) {
		var buffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
		
		gl.bufferData(
			gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW
		);
		
		return buffer;
	}
	
	function setModelView(gl, prgm, pos, rot, axis) {
		var mvMatrix = mat4.identity(mat4.create());
		
		mat4.translate(mvMatrix, pos);
		mat4.rotate(mvMatrix, rot, axis);
		
		gl.uniformMatrix4fv(
			gl.getUniformLocation(prgm, "uModelView"),
			false, mvMatrix
		);
		
		return mvMatrix;
	}
	
	function setProjection(gl, prgm, fov, aspect, near, far) {
		var projMatrix = mat4.create();
		
		mat4.perspective(
			fov, aspect,
			near, far,
			projMatrix
		);
		
		gl.uniformMatrix4fv(
			gl.getUniformLocation(prgm, "uProjection"),
			false, projMatrix
		);
		
		return projMatrix;
	}
	
	return {
		createShaderObject: createShaderObject,
		createProgramObject: createProgramObject,
		createFloatBuffer: createFloatBuffer,
		createIndexBuffer: createIndexBuffer
	};
})();