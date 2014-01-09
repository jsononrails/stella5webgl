jewel.display = (function() {
	var dom = jewel.dom,
		$ = dom.$,
		canvas, ctx,
		cols, rows,
		jewelSize,
		firstRun = true;
		
	function setup() {
		var boardElement = $("#game-screen .game-board")[0];
		
		cols = jewel.settings.cols;
		rows = jewel.settings.rows;
		jewelSize = jewel.settings.jewelSize;
		
		canvas = document.createElement("canvas");
		ctx = canvas.getContext("2d");
		dom.addClass(canvas, "board");
		canvas.width = cols * jewelSize;
		canvas.height = rows * jewelSize;
		
		boardElement.appendChild(canvas);
	}
	
	function initialize(callback) {
		if(firstRun) {
			setup();
			firstRun = false;
		}
		callback();
	}
	
	return {
		initialize: initialize
	};
})();