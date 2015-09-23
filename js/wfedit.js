function wfeditApp () {
	var c = document.getElementById('wfCanvas');
	var ctx = c.getContext('2d');

	var rects = [];
	var dragStart = { x: 0, y: 0 };

	var Rect = function (x, y) {
		this.x = x;
		this.y = y;
		this.height = 50;
		this.width = 30;
		this.color = "#ff00ee";
		this.highlight = "#000000";
		this.selected = false;
		

		this.contains = function (x, y) {
			if ((this.x) <= x && (this.x + this.width) >= x &&
				(this.y) <= y && (this.y + this.height) >= y) {
				return true;
			} else {
				return false;
			}
		};
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

		c.addEventListener('mousedown', function (e) {
			var clicked = findRect (e.clientX, e.clientY);
			if (clicked >= 0) {
				toggleSelectRect (clicked);
				raiseRect (clicked);
				startDrag(e.clientX, e.clientY);
			}	
			drawScreen();
		});

		c.addEventListener('mouseup', function () {
			if (rects.length > 0) {
				rects[rects.length - 1].selected = false;
			}
			/*rects.forEach(function (rectItem) {
				rectItem.selected = false;
			});*/
			drawScreen();
		});

		c.addEventListener('mousemove', function (e) {
			if (rects.length > 0) {
				var activeRect = rects[rects.length - 1];
				if (activeRect.selected) {
					var dx = e.clientX - dragStart.x
					var dy = e.clientY - dragStart.y;
					activeRect.x += dx;
					activeRect.y += dy;
					startDrag(e.clientX, e.clientY);
					drawScreen();
				}
			}
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
	}

	function findRect (x, y) {
		// this selects the highest rectangle in the stack
		// that's under the mouse, because the order of the array matters
		for (var i = rects.length -1; i >= 0; i--) {
			if (rects[i].contains(x,y) == true) {
				return i;
			}
		}
		return -1;
	}

	function raiseRect (rectIndex) {
		var rect = rects.splice(rectIndex, 1);
		rects.push(rect[0]);
	}

	function toggleSelectRect (rectIndex) {
		rects[rectIndex].selected = !rects[rectIndex].selected;		
	}

	function startDrag (x, y) {
		dragStart.x = x;
		dragStart.y = y;
	} 

	function drawScreen () {
		var color = "#000000";
		ctx.fillStyle = "#ffffee";
		ctx.fillRect (0, 0, c.width, c.height);

		ctx.strokeStyle = "rgb(0, 0, 255)";
		ctx.strokeRect (0, 0, c.width, c.height);

		rects.forEach(function (rectItem) {
			if (rectItem.selected) {
				color = rectItem.highlight;
			} else {
				color = rectItem.color;
			}
			drawRect(rectItem.x - c.offsetLeft, 
				     rectItem.y - c.offsetTop,
				     rectItem.width,
				     rectItem.height,
				     color);
		});
	}

	function drawRect (x, y, dx, dy, color) {
		ctx.fillStyle = "#ffffff";
		ctx.fillRect (x, y, dx, dy);
		ctx.strokeStyle = color;
		ctx.strokeRect (x, y, dx, dy);
	}

	initApp();
}

window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded () {
	wfeditApp();
}


