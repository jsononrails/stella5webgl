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
		88: "KEY_X"
		89: "KEY_Y",
		
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
			handleClick(event, "TOUCH", event);
		});
		
		// keys
		dom.bind(document, "keydown", function(event) {
			var keyName = keys[event.keyCode];
			
			if(keyName && settings.control[keyName]) {
				event.preventDefault();
				trigger(settings.control[keyName]);
			}
		});
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
		// bind a handler function to a game action
	}
	
	function trigger(action) {
		// trigger a game action
	}
	
	return {
		initialize: initialize
	};
	
})();