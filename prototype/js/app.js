/* 
 * Affiniture Cards Limited - Instalment_Loan
 * js/app.js - v0.1
 * JS for modern Diners Club Components
 * 
 * Copyright 2017 Affiniture Cards Limited
 */

$(document).ready(function () {

	// Toggle Navigation State on Window Scroll Event
	var nav = $("nav.nav-fixable");
	$(window).scroll(function () {
		toggleFixedNav(nav);
	});

	// Navigation
	$("nav").scrollspy({ offset: -50, animate: true });

	// Init Parallax Scrolling
	refreshParallax('.parallax-container', 992);

	$(window).resize(function () {
		refreshParallax('.parallax-container', 992);
	})
	
	// Initialise Pricing Product Tabs
	$( "#pricing-products" ).tabs({
		show: 'fadeIn',
		hide: 'fadeOut',
		create: function( event, ui ) {
			// Initialise Pricing Forms
			$(this).find('.pricing-form').each(function () {
				$(this).pricingForm();
			});
		},
	});

});

// Toggle Navigation Fixed State 
function toggleFixedNav(target) {
	if ($(window).scrollTop() >= $(target).parent().offset().top) {
		$(target).addClass('fixed');
	} else {
		$(target).removeClass('fixed');
	}
}

function refreshParallax(selector, minWidth) {
	var parallax = $(selector);

	// Loop though each parallax element
	$(parallax).each(function () {
		// Check that window width is larger than minimum reqired
		if ($(window).width() > minWidth) {
			// Check if parallax initialised
			if (!$(this).attr('data-parallax-init')) {
				// Init parallax element
				$(this).jarallax({
					speed: 0.5
				});
				// Set parallax init attribute
				$(this).attr('data-parallax-init', 'true');
			}
		} else {
			// Check if parallax initialised
			if ($(this).attr('data-parallax-init')) {
				// Destroy parallax effect
				$(this).jarallax('destroy');
				// Remove parallax init attribute
				$(this).removeAttr('data-parallax-init');
			}
		}

	});
	
}