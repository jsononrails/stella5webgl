jewel.input = (function() {
	var dom = jewel.dom,
		$ = dom.$,
		settings = jewel.settings,
		inputHandlers;
	
	// keyboard key mappings
	var keys = {
		37: "KEY_LEFT",
		38: "KEY_UP",
		39: "KEY_RIGHT",
		40: "KEY_DOWN",
		13: "KEY_ENTER",
		32: "KEY_ENTER",
		65: "KEY_A",
		66: "KEY_B",
		67: "KEY_C",
		
		// alpha keys 68-87
		88: "KEY_X",
		89: "KEY_Y"
		
	};
		
	function initialize() {
		inputHandlers = {};
		
		var board = $("#game-screen .game-board")[0];
		
		// mouse
		dom.bind(board, "mousedown", function(event) {
			handleClick(event, "CLICK", event);
		});
		
		// touch
		dom.bind(board, "touchstart", function(event) {
			handleClick(event, "TOUCH", event.targetTouches[0]);
		});
		
		dom.bind(board, "touchmove", function(event) {
			handleMove(event, "TOUCHMOVE", event.targetTouches[0]);
		});
		
		dom.bind(board, "touchend", function(event) {
			handleEndMove(event, "ENDTOUCHMOVE", event.targetTouches[0]);
		});
		
		// keys
		dom.bind(document, "keydown", function(event) {
			var keyName = keys[event.keyCode];
			
			if(keyName && settings.controls[keyName]) {
				event.preventDefault();
				trigger(settings.controls[keyName]);
			}
		});
	}
	
	function handleMove(event, control, touches) {

		// is any action bound to this input control?
		var action = settings.controls[control];
		
		if(!action) {
			return;
		}
		
		var board = $("#game-screen .game-board")[0],
			rect = board.getBoundingClientRect(),
			relX, relY,
			jewelX, jewelY;
			
		relX = touches.clientX - rect.left;
		relY = touches.clientY - rect.top;
		
		// jewel coordinates
		jewelX = Math.floor(relX / rect.width * settings.cols);
		jewelY = Math.floor(relY / rect.height * settings.rows);
		
		// trigger functions bound to action
		trigger(action, jewelX, jewelY);
		
		// prevent default behaviour
		event.preventDefault();
	}
	
	function handleEndMove(event, control, touches) {
		// is any action bound to this input control?
		var action = settings.controls[control];
		
		if(!action) {
			return;
		}
		
		// trigger functions bound to action
		trigger(action);
		
		// prevent default behaviour
		event.preventDefault();
	}
	
	function handleClick(event, control, click) {
		// is any action bound to this input control?
		var action = settings.controls[control];
		if(!action) {
			return;
		}
		
		var board = $("#game-screen .game-board")[0],
			rect = board.getBoundingClientRect(),
			relX, relY,
			jewelX, jewelY;
		
		// click position relative to board
		relX = click.clientX - rect.left;
		relY = click.clientY - rect.top;
		
		// jewel coordinates
		jewelX = Math.floor(relX / rect.width * settings.cols);
		jewelY = Math.floor(relY / rect.height * settings.rows);
		
		// trigger functions bound to action
		trigger(action, jewelX, jewelY);
		
		// prevent default behaviour
		event.preventDefault();
	}
	
	function bind(action, handler) {
		if(!inputHandlers[action]) {
			inputHandlers[action] = [];
		}
		inputHandlers[action].push(handler);
	}
	
	function trigger(action) {
		var handlers = inputHandlers[action],
			args = Array.prototype.slice.call(arguments, 1);
		
		if(handlers) {
			for(var i=0; i<handlers.length; i++) {
				handlers[i].apply(null, args);
			}
		}
	}
	
	return {
		initialize: initialize,
		bind: bind
	};
	
})();