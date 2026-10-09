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






// Gallery sliders (.ixtapa-slider): show the active slide's caption as text inside the module, below the images
jQuery(function ($) {
	$('.ixtapa-slider').each(function () {
		var $slider = $(this);
		var $caption = $('<p class="ixtapa-slide-caption" aria-live="polite"></p>').appendTo($slider);
		var $items = $slider.find('.et_pb_gallery_items');
		var update = function () {
			var $img = $slider.find('.et-pb-active-slide img').first();
			$caption.text($img.attr('alt') || '');
			// lets the CSS center the arrows on the image instead of on the whole module (image + dots + caption)
			$slider[0].style.setProperty('--ixtapa-img-h', $items.outerHeight() + 'px');
		};
		update();
		$(window).on('load resize', update);
		new MutationObserver(update).observe($slider[0], { subtree: true, attributes: true, attributeFilter: ['class'] });
	});
});

// Flyout menu: a Divi menu module with the CSS class "flyout-menu" becomes a ☰ button
// that opens a side panel (built from the same menu) sliding in from the left.
jQuery(function ($) {
	var $menu = $('.et_pb_menu.flyout-menu').first();
	if (!$menu.length) return;

	var $list = $menu.find('.et-menu-nav > ul').first().clone();
	$list.removeAttr('id').attr('class', 'flyout-list');
	$list.find('[id]').removeAttr('id');
	// group titles that only open a submenu ("#") are shown as plain labels
	$list.find('a[href="#"]').each(function () {
		$(this).replaceWith($('<span class="flyout-group"></span>').text($(this).text()));
	});

	var $panel = $('<nav class="flyout-panel" id="flyout-panel" aria-label="Menú principal" aria-hidden="true">' +
		'<button type="button" class="flyout-close" aria-label="Cerrar menú">&times;</button></nav>').append($list);
	var $backdrop = $('<div class="flyout-backdrop" hidden></div>');
	var $toggle = $('<button type="button" class="flyout-toggle" aria-controls="flyout-panel" aria-expanded="false">' +
		'<span class="flyout-icon"><span></span><span></span><span></span></span><span class="flyout-label">Menú</span></button>');

	$menu.find('.et_pb_menu__wrap').prepend($toggle);
	$('body').append($backdrop, $panel);

	var setOpen = function (open) {
		$('body').toggleClass('flyout-open', open);
		$toggle.attr('aria-expanded', open);
		$panel.attr('aria-hidden', !open);
		$backdrop.prop('hidden', !open);
		(open ? $panel.find('.flyout-close') : $toggle).trigger('focus');
	};
	$toggle.on('click', function () { setOpen(true); });
	$panel.on('click', '.flyout-close', function () { setOpen(false); });
	$backdrop.on('click', function () { setOpen(false); });
	$(document).on('keydown', function (e) {
		if (e.key === 'Escape' && $('body').hasClass('flyout-open')) setOpen(false);
	});
});
