	var $mask = $('.mask');
	var $window = $(window);
	var offset;
	var winCenter;
	var revealHeight;
	var $this;


jQuery.fn.revealMe = function() {	

	$this = $(this);
	offset = $window.height() + $window.scrollTop() - $this.offset().top * 0.25;
	winCenter = $window.height() / 2;
	revealHeight = offset - winCenter;

	$this.animate({ 'height' : revealHeight },{queue: false, duration:1000});

}

jQuery(function($){

	$mask.revealMe();

	$(window).on("scroll resize", function(){
		$mask.revealMe();
	});	

});