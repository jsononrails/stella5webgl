var jewel = {
	screens: {}
};

// wait until main document is loaded
window.addEventListener("load", function() {
	
	Modernizr.addTest("standalone", function() {
		return (window.navigator.standalone != false);
	});
	
	// start dynamic loading
	Modernizr.load([
		{
			// these files are always loaded
			load: [
				"/scripts/thirdparty/sizzle.min.js",
				"/scripts/jewelwarrior/dom.js",
				"/scripts/jewelwarrior/game.js",
			]
		},
		{
			test: Modernizr.standalone,
			yep: "/scripts/jewelwarrior/screen.splash.js",
			nope: "/scripts/jewelwarrior/screen.install.js",
			complete: function() {
				if(Modernizr.standalone) {
					jewel.game.showScreen("splash-screen");
				} else {
					jewel.game.showScreen("install-screen");
				}
			}
		}
	]);
	
	// loading stage 2
	if(Modernizr.standalone) {
		Modernizr.load([
				{
					load: ["/scripts/jewelwarrior/screen.main-menu.js"]
				}
			]);
	}
}, false);