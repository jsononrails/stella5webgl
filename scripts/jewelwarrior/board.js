jewel.board = (function() {
	var settings,
		jewels,
		cols,
		rows,
		baseScore,
		numJewelTypes;
	
	function initialize(callback) {
		settings = jewel.settings;
		numJewelTypes = settings.numJewelTypes;
		baseScore = settings.baseScore;
		cols = settings.cols;
		rows = settings.rows;
		fillBoard();
		callback();
	}
	
	function print() {
		var str = "";
		for(var y = 0; y<rows; y++) {
			for(var x = 0; x<cols; x++) {
				str += getJewel(x, y) + " ";
			}
			str += "\r\n";
		}
		console.log(str);
	}
	
	function fillBoard() {
		var x, y;
		jewels = [];
		for(x = 0; x < cols; x++) {
			jewels[x] = [];
			for(y = 0; y < rows; y++) {
				jewels[x][y] = randomJewel();
			}
		}
	}
	
	function randomJewel() {
		return Math.floor(Math.random() * numJewelTypes);
	}
	
	return {
		initialize: initialize,
		print: print
	};
})();