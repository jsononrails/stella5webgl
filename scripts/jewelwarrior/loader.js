var jewel = {
	screens: {},
	images: {},
	settings: {
		rows: 8,
		cols: 8,
		baseScore: 100,
		numJewelTypes: 7,
		baseLevelTimer: 60000,
		baseLevelScore: 1500,
		baseLevelExp: 1.05,
		
		controls: {
			KEY_UP: "moveUp",
			KEY_LEFT: "moveLeft",
			KEY_DOWN: "moveDown",
			KEY_RIGHT: "moveRight",
			KEY_ENTER: "selectJewel",
			CLICK: "selectJewel",
			TOUCH: "selectJewel"
		}
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
	
	// test for webgl support
	Modernizr.addTest("webgl2", function() {
		try {
			var canvas = document.createElement("canvas"),
			ctx = canvas.getContext("experimental-webgl");
			
			return !!ctx;
		} catch(e) {
			return false;
		};
	});
	
	// extend yepnope with preloading
	yepnope.addPrefix("preload", function(resource) {
		resource.noexec = true;
		return resource;
	});
	
	// tracking loading progress and preloading assets
	var numPreload = 0,
		numLoaded = 0;
	
	yepnope.addPrefix("loader", function(resource) {
		// console.log("Loading: " + resource.url);
		var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
		resource.noexec = isImage;
		
		numPreload++;
		
		resource.autoCallback = function(e) {
			// console.log("Finished loading: " + resource.url);
			numLoaded++;
			if(isImage) {
				var image = new Image();
				image.src = resource.url;
				jewel.images[resource.url] = image;
			}
		};
		return resource;
	});
	
	// current loader progress
	function getLoadProgress() {
		if(numLoaded >0) {
			return numLoaded / numPreload;
		} else {
			return 0;
		}
	}
	
	// loading stage 1
	Modernizr.load([
		{
			test: Modernizr.localstorage,
			yep: "/scripts/jewelwarrior/storage.js",
			nope: "/storage/jewelwarrior/storage.cookie.js"
		},
		{
			// these files are always loaded
			load: [
				"/scripts/thirdparty/sizzle.min.js",
				"/scripts/jewelwarrior/dom.js",
				"/scripts/jewelwarrior/requestAnimationFrame.js",
				"/scripts/jewelwarrior/game.js",
			]
		},
		{
			test: Modernizr.standalone,
			yep: "/scripts/jewelwarrior/screen.splash.js",
			nope: "/scripts/jewelwarrior/screen.install.js",
			complete: function() {
				jewel.game.setup();
				if(Modernizr.standalone) {
					jewel.game.showScreen("splash-screen", getLoadProgress);
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
				test: Modernizr.webworkers,
				yep: [
					"loader!/scripts/jewelwarrior/board.worker-interface.js",
					"preload!/scripts/jewelwarrior/board.worker.js"
					],
				nope: "loader!/scripts/jewelwarrior/board.js"
			},
			{
				test: Modernizr.webgl2,
				yep: [
						"loader!/scripts/jewelwarrior/webgl.js",
						"loader!/scripts/thirdparty/debug.js",
						"loader!/scripts/jewelwarrior/display.webgl.js",
						"loader!/scripts/thirdparty/glMatrix.min.js",
						"loader!/jewelwarrior/images/jewelpattern.jpg"
				]
			},
			{
				test: Modernizr.canvas && !Modernizr.webgl2,
				yep: "loader!/scripts/jewelwarrior/display.canvas.js",
			},
			{
				load: [
					"loader!/scripts/jewelwarrior/audio.js",
					"loader!/scripts/jewelwarrior/input.js",
					"loader!/scripts/jewelwarrior/screen.about.js",
					"loader!/scripts/jewelwarrior/screen.hiscore.js",
					"loader!/scripts/jewelwarrior/screen.main-menu.js",
					"loader!/scripts/jewelwarrior/screen.game.js",
					"loader!/jewelwarrior/images/jewels" + jewel.settings.jewelSize + ".png"
				]
			}
		]);
	}
}, false);