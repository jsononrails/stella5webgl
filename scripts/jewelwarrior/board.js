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
		var x, y,
			type;
			
		jewels = [];
		for(x = 0; x < cols; x++) {
			jewels[x] = [];
			for(y = 0; y < rows; y++) {
				type = randomJewel();
				while((type===getJewel(x-1, y) &&
					   type===getJewel(x-2, y) &&
					   type===getJewel(x, y-1) &&
					   type===getJewel(x, y-2))) {
						
						type = randomJewel();
					}
					
					jewels[x][y] = type;
			}
		}
	}
	
	function getJewel(x, y) {
		if(x<0 || x > cols -1 || y < 0 || y > rows-1) {
			return -1;
		} else {
			return jewels[x][y];
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