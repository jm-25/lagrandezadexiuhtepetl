jQuery(document).ready(function( $ ) {
	
});

$(function () {
	$('.open-popup').magnificPopup({
		type: 'inline',
		preloader: false,
		gallery: {
			enabled: true
		  }
	});
	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});
});

