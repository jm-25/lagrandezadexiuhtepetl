jQuery(document).ready(function( $ ) {
	
});

$(function () {
	$('.open-popup').magnificPopup({
		type: 'inline',
		preloader: false,
		overflowY: 'scroll', // or 'auto'
		gallery: {
			enabled: true
		  }	  
	});
	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});
});





$('.popup-link').magnificPopup({
  // ... other options ...
  gallery: {
	// ... other gallery options ...
  },
  callbacks: {
	change: function() {
	  this.content.scrollTop(0);
	}
  }
});