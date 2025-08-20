jQuery(document).ready(function( $ ) {
	
});

$(function () {
	$('.open-popup').magnificPopup({
		type: 'inline',
		preloader: false,
		overflowY: 'scroll', // or 'auto'
		gallery: {
			enabled: true
		  },
		callbacks: {
			change: function() {
				this.content.scrollTop(0);
			}
		}		  	  
	});

	$('.open-icon-popup').magnificPopup({
		type: 'inline'
			  	  
	});
	
	// $(document).on('click', '.popup-modal-dismiss', function (e) {
	// 	e.preventDefault();
	// 	$.magnificPopup.close();
	// });
});





