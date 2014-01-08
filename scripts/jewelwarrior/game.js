jewel.game = (function() {
	var dom = jewel.dom,
	$ = dom.$;
	
	function setup() {
		// disable native touchmove behavior to
		// prevent overscroll
		dom.bind(document, "touchmove", function(event) {
			event.preventDefault();
		});
		
		// hide the address bar on Android devices
		if(/Android/.test(navigator.userAgent)) {
			$("html")[0].style.height = "200%";
			setTimeout(function() {
				window.scrollTo(0,1);
			}, 0);
		}
	}
	
	// hide the active screen (if any) and show the screen
	// with the specified id
	function showScreen(screenId) {

		var activeScreen = $("#game .screen.active")[0],
			screen = $("#" + screenId)[0]
		
		if (activeScreen) {
			dom.removeClass(activeScreen, "active");
		}
		
		// extract screen parameters from arguments
		var args = Array.prototype.slice.call(arguments, 1);
		
		// run the screen module
		jewel.screens[screenId].run.apply(
			jewel.screens[screenId], args
		);
		
		// display the active screen html
		dom.addClass(screen, "active");
	}
	
	// expose public methods
	return {
		setup: setup,
		showScreen: showScreen
	};
})();