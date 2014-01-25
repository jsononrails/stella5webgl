jewel.screens["splash-screen"] = (function(){
	var game = jewel.game,
	dom = jewel.dom,
	$ = dom.$,
	firstRun = true;
	
	function setup(getLoadProgress) {

		var screen = $("#splash-screen")[0];
		
		function checkProgress() {
			var p = getLoadProgress() * 100;
			
			$(".indicator", screen)[0].style.width = p + "%";

			if(p==100) {

				$(".continue", screen)[0].style.display = "block";
				
				dom.bind("#splash-screen", "click", function() {
					game.showScreen("main-menu");
				})
				
			} else {
				setTimeout(checkProgress, 30);
			}
		}
		checkProgress();
	}
	
	function run(getLoadProgress) {
		if(firstRun) {
			setup(getLoadProgress);
			firstRun = false;
		}
	}
	
	return {
		run: run
	};
})();