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
	
	return {
		createShaderObject: createShaderObject,
		createProgramObject: createProgramObject
	};
})();