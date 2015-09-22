function canvasSupport() {
	return Modernizr.canvas;
}

function wfeditApp () {
	if (!canvasSupport()) {
		console.log("Your browser does not support HTML5 Canvas.");
		return;
	}

	drawScreen();

	function drawScreen() {
		var c = document.getElementById('wfCanvas');
		var ctx = c.getContext("2d");
		ctx.fillStyle = "#ffffaa";
    	ctx.fillRect(0, 0, 500, 300);

    	ctx.fillStyle = "#000000";
    	ctx.font = "20px sans-serif";
    	ctx.textBaseline = "top";
    	ctx.fillText("Hello, World!", 195, 80);
	}
}

window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded () {
	wfeditApp();
}