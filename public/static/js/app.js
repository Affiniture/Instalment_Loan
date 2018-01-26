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
	$("nav ul").scrollspy({ offset: -50, animate: true });

	// Init Parallax Scrolling
	refreshParallax('.parallax-container', 992);

	$(window).resize(function () {
		refreshParallax('.parallax-container', 992);
	})

	// Toggle Mobile Navigation
	toggleMobileNav('.nav-secondary');

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

// Initialise Cookie Consent
window.addEventListener("load", function(){
	window.cookieconsent.initialise({
		"palette": {
			"popup": {
				"background": "#477196",
				"text": "#ffffff"
			},
			"button": {
				"background": "#ffffff",
				"text": "#477196"
			}
		},
		"position": "top",
		"static": "true",		
		"content": {
			"message": "Diners Club International uses cookies to ensure you get the best experience on our website.",
			"dismiss": "Dismiss",
			"href": "http://www.dinersclub.co.uk/Other/Privacy%20Policy.aspx"
		}
	})
});

// Toggle Navigation Fixed State 
function toggleMobileNav(target) {
	// Toggle Nav Click Handler
	$(target).find('.nav-secondary-mobile-toggle').click(function () {
		$(target).toggleClass('nav-expanded');
	});

	// Contract Nav on Link Click
	$(target).find('li a').each(function () {
		$(this).click(function () {
			$(target).removeClass('nav-expanded');
		});
	});
}

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

	// Check browser is not IE / Edge
	if (!checkBrowser(['MSIE', 'Trident', 'Edge'])) {
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
	};
}

function checkBrowser(query) {
	var found = false;
	for(var i = 0; i < query.length; i++) {
		if (navigator.userAgent.search(query[i]) > 0) {
			found = true;
			break;
		}
	}
	return found;
}