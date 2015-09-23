function wfeditApp () {
	var c = document.getElementById('wfCanvas');
	var ctx = c.getContext('2d');

	var rects = [];

	var Rect = function (x, y) {
		this.x = x;
		this.y = y;
		this.height = 50;
		this.width = 30;
		this.color = "#ff00ee";
	};

	function initApp () {
		// resize and reposition canvas
		resizeCanvas();

		// on every resize, resize canvas again
		window.addEventListener('resize', function () {
			resizeCanvas();
			drawScreen();
		}, false);

		c.addEventListener('dblclick', function (e) {
			createRect (e.clientX, e.clientY);
			drawScreen();
		});

		drawScreen();
	}

	function resizeCanvas () {		
		// top left is hardcoded to (10,10) in index.html
		c.height = window.innerHeight - 20;
		c.width = window.innerWidth - 20;
	}

	function createRect (x, y) {
		var rect = new Rect(x, y);
		rects.push(rect);
		console.log(rects);
	}

	function drawScreen () {
		console.log ("drawing screen");
		ctx.fillStyle = "#ffffee";
		ctx.fillRect (0, 0, c.width, c.height);

		ctx.strokeStyle = "rgb(0, 0, 255)";
		ctx.strokeRect (0, 0, c.width, c.height);

		rects.forEach(function (rectItem) {
			drawRect(rectItem.x - c.offsetLeft, 
				     rectItem.y - c.offsetTop,
				     rectItem.height,
				     rectItem.width,
				     rectItem.color);
		});
	}

	function drawRect (x, y, dx, dy, color) {
		ctx.strokeStyle = color;
		ctx.strokeRect (x, y, dx, dy);
	}

	initApp();
}

window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded () {
	wfeditApp();
}


