/**
 * Light layer on top of a canvas element to represent an image displayed
 * within.  Pass in a canvas element and an Image object and you'll see the
 * image within the canvas element.  Use the provided methods (e.g. blur) to
 * manipulate it.
 *
 * @constructor
 * @param {HTMLElement} element HTML canvas element.
 * @param {Image} image Image object.
 */
var CanvasImage = function(element, image) {
	this.image = image;
	this.element = element;
	this.element.width = this.image.width;
	this.element.height = this.image.height;
	this.context = this.element.getContext("2d");
	this.context.drawImage(this.image, 0, 0);
};
CanvasImage.prototype = {
	/**
	 * Runs a blur filter over the image.
	 *
	 * @param {int} passes Number of times the blur filter should run.
	 */
	blur: function (passes) {
		var i, x, y;
		this.context.globalAlpha = 0.525;
		// Loop for each blur pass.
		for (i = 1; i <= passes; i += 1) {
			for (y = -1; y < 2; y += 1) {
				for (x = -1; x < 2; x += 1) {
					// Place eight versions of the image over the original
					// image, each with 1/8th of full opacity.  The images are
					// placed around the original image like a square filter.
					// This gives the impression the image has been blurred,
					// but it's done at native browser speed, thus making it
					// much faster than writing a proper blur filter in
					// Javascript.
					this.context.drawImage(this.element, x, y);
				}
			}
		}
		this.context.globalAlpha = 1.0;
	}
};


/**
 * Initialise an image on the page and blur it.
 */
$.fn.blurMe = function() {
	var id = "blur",
		url = "img/non-blur.jpg",
		image = new Image(),
		canvasImage;
	image.onload = function () {
		canvasImage = new CanvasImage(document.getElementById(id), this);
		console.time(id);
		canvasImage.blur(4);
		console.timeEnd(id);
		console.log(url)
	};
	image.src = url;
};


jQuery(function($){

	$(window).on("load", function(){
		$('#blur').blurMe();
	});	

});
