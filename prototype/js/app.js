/* 
 * Affiniture Cards Limited - Instalment_Loan
 * js/legacy.css - v0.1
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

});

// Toggle Navigation Fixed State 
function toggleFixedNav(target) {
	if ($(window).scrollTop() >= $(target).parent().offset().top) {
		$(target).addClass('fixed');
	} else {
		$(target).removeClass('fixed');
	}
}