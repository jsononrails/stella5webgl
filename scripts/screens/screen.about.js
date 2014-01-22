jewel.screens["about-screen"] = (function() {
	var dom = jewel.dom,
		$ = dom.$,
		firstRun = true;
	
	function run(score) {
		if(firstRun) {
			setup();
			firstRun = false;
		}
	}
	
	function setup() {
		var backButton = $("#about-screen footer button[name=back]")[0];
		dom.bind(backButton, "click", function(e) {
			game.showScreen("main-menu");
		});
	}
	
	return {
		run: run
	};
	
})();