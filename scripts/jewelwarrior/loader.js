var jewel = {
	screens: {},
	images: {},
	settings: {
		rows: 8,
		cols: 8,
		baseScore: 100,
		numJewelTypes: 7
	}
};

// wait until main document is loaded
window.addEventListener("load", function() {
	
	// determine jewel size
	var jewelProto = document.getElementById("jewel-proto"),
		rect = jewelProto.getBoundingClientRect();
		
	jewel.settings.jewelSize = rect.width;
	
	Modernizr.addTest("standalone", function() {
		return (window.navigator.standalone != false);
	});
	
	// extend yepnope with preloading
	yepnope.addPrefix("preload", function(resource) {
		resource.noexec = true;
		return resource;
	});
	
	// start dynamic loading
	Modernizr.load([
		{
			// these files are always loaded
			load: [
				"/scripts/thirdparty/sizzle.min.js",
				"/scripts/jewelwarrior/dom.js",
				"/scripts/jewelwarrior/game.js",
				"/scripts/jewelwarrior/board.js"
			]
		},
		{
			test: Modernizr.standalone,
			yep: "/scripts/jewelwarrior/screen.splash.js",
			nope: "/scripts/jewelwarrior/screen.install.js",
			complete: function() {
				jewel.game.setup();
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
			},
			{
				test: Modernizr.webworkers,
				yep: ["/scripts/jewelwarrior/board.worker-interface.js",
					 "preload!/scripts/jewelwarrior/board.worker.js"],
				nope: "/scripts/jewelwarrior/board.js"
			}
		]);
	}
}, false);