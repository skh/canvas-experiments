function wfeditApp () {
	var c = document.getElementById('wfCanvas');
	var ctx = c.getContext('2d');
	
	

	var rects = [];
	var dragStart = { x: 0, y: 0 };

	var Rect = function (x, y) {
		this.x = x;
		this.y = y;
		this.height = 100;
		this.width = 100;
		this.color = "#333333";
		this.highlight = "#999999";
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
		c.height = window.innerHeight - 200;
		c.width = window.innerWidth - 200;
		ctx.translate(0.5, 0.5); // fix blurring
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

		drawBackground (0, 0, c.width, c.height);

		var color = "#000000";
		var alpha = 1;
		var radius = 8;

		rects.forEach(function (rectItem) {
			if (rectItem.selected) {
				color = rectItem.highlight;
				alpha = 0.95;
			} else {
				color = rectItem.color;
			}
			drawRect(rectItem.x - c.offsetLeft, 
				     rectItem.y - c.offsetTop,
				     rectItem.width,
				     rectItem.height,
				     color, alpha,
				     radius);
		});
	}

	function drawGrid (x, y, dx, dy, spacing) {
		

	}

	function drawBackground (x, y, dx, dy) {
		ctx.fillStyle = "#ffffee";
		ctx.fillRect (x, y, dx, dy);
	  	ctx.lineWidth = 2;
		ctx.strokeStyle = "rgb(255, 0, 0)";
		ctx.strokeRect (x + 1, y + 1, dx - 3, dy - 3);
	}

	/* drawRect -- draw a rectangle
	 * arguments:
	 * x, y: the coordinates of the top left corner
	 * dx, dy: width and height
	 * color: the color of the border
	 * alpha: the transparency (0 is invisible, 1 is opaque)
	 * r: the radius of the rounded corners
	 *
	 */
	function drawRect (x, y, dx, dy, color, alpha, r) {
		ctx.save();
		ctx.globalAlpha = alpha;

		ctx.beginPath();

		// see http://www.dbp-consulting.com/tutorials/canvas/CanvasArcTo.html
		// draw top and top right corner
		ctx.moveTo (x+r, y);
		ctx.arcTo (x+dx, y, x+dx, y+r, r);

		// draw right side and bottom right corner
    	ctx.arcTo(x+dx,y+dy,x+dx-r,y+dy,r); 

    	// draw bottom and bottom left corner
    	ctx.arcTo(x,y+dy,x,y+dy-r,r);

    	// draw left and top left corner
    	ctx.arcTo(x,y,x+r,y,r);
		
		ctx.fillStyle = "#ffffff";
		ctx.fill();

		ctx.lineWidth = 1;
		ctx.strokeStyle = color;
		ctx.stroke();

		ctx.restore();
	}

	initApp();
}

window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded () {
	wfeditApp();
}


