jQuery(document).ready(function( $ ) {
	
});

$(function () {
	$('.open-popup').magnificPopup({
		type: 'inline',
		preloader: false,
		overflowY: 'scroll', // or 'auto'
		fixedContentPos: true, // the default 'auto' isn't fixed on phones, so the popup scrolled with the page
		mainClass: 'catalog-popup',
		gallery: {
			enabled: true
		  },
		callbacks: {
			open: function() {
				var wrap = this.wrap;
				// phones: "keep reading" cue until the reader scrolls the description (or when it already fits)
				var hint = this.scrollHint = $('<div class="scroll-hint" aria-hidden="true">Desliza para leer &darr;</div>').appendTo(wrap);
				var updateHint = this.updateHint = function () {
					var el = wrap[0];
					hint.toggleClass('is-hidden', wrap.scrollTop() > 20 || el.scrollHeight <= el.clientHeight + 20);
				};
				wrap.on('scroll.catalog', updateHint);
				setTimeout(updateHint, 50);
				// phones: the arrows scroll with the content, vertically centred on the image (CSS reads --catalog-arrow-top)
				var mfp = this;
				var placeArrows = this.placeArrows = function () {
					var img = mfp.content && mfp.content.find('img')[0];
					if (!img) return;
					var top = img.getBoundingClientRect().top - mfp.container[0].getBoundingClientRect().top + img.offsetHeight / 2;
					wrap[0].style.setProperty('--catalog-arrow-top', top + 'px');
				};
				$(window).on('resize.catalog', placeArrows);
				setTimeout(placeArrows, 50);
				var img = this.content && this.content.find('img')[0];
				if (img && !img.complete) $(img).one('load', placeArrows);
			},
			change: function() {
				// the wrap is what scrolls, not the content
				if (this.wrap) {
					this.wrap.scrollTop(0);
					if (this.updateHint) setTimeout(this.updateHint, 50);
				}
				if (this.placeArrows) {
					setTimeout(this.placeArrows, 50);
					var img = this.content && this.content.find('img')[0];
					if (img && !img.complete) $(img).one('load', this.placeArrows);
				}
			},
			close: function() {
				$(window).off('resize.catalog');
				this.wrap.off('scroll.catalog');
				if (this.scrollHint) this.scrollHint.remove();
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






// Every Magnific modal (Catálogo popups and the gallery lightbox): a horizontal swipe goes to the previous / next item
jQuery(function ($) {
	if (!$.magnificPopup) return;
	var startX = 0, startY = 0;
	$(document)
		.on('touchstart', '.mfp-wrap', function (e) {
			var t = e.originalEvent.touches[0];
			startX = t.clientX;
			startY = t.clientY;
		})
		.on('touchend', '.mfp-wrap', function (e) {
			var mfp = $.magnificPopup.instance;
			if (!mfp.isOpen || !mfp.items || mfp.items.length < 2) return;
			var t = e.originalEvent.changedTouches[0];
			var dx = t.clientX - startX, dy = t.clientY - startY;
			if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
				dx < 0 ? mfp.next() : mfp.prev();
			}
		});
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
