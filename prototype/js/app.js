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


	// Construct Sliders
	
	var interestSlider = $(".interest-slider");

	$(interestSlider).submit(function(e) {
		$(this).find('input[name=amount]').val(
			$( "#amount-slider" ).slider( "value" )
		);
		$(this).find('input[name=term]').val(
			$( "#term-slider" ).slider( "value" )
		);
	});

	// If slider containter present initialise sliders
	if (interestSlider.length > 0) {

		var amountMin = parseInt($(interestSlider).attr('data-amount-min'));
		var amountMax = parseInt($(interestSlider).attr('data-amount-max'));
		var termMin = parseInt($(interestSlider).attr('data-term-min'));
		var termMax = parseInt($(interestSlider).attr('data-term-max'));

		// Pricing Sliders
		$( "#amount-slider" ).slider({
			range: "max",
			min: amountMin,
			max: amountMax,
			step: 500,
			value: 2000,
			create: function() {
				var text = "£" + $( this ).slider( "value" );
				$( this ).find('.ui-slider-handle').text( text );
			},
			slide: function( event, ui ) {
				var text = "£" + ui.value;
				$( this ).find('.ui-slider-handle').text( text );
			}
		});

		$( "#term-slider" ).slider({
			range: "max",
			min: termMin,
			max: termMax,
			value: 6,
			create: function() {
				var text = $( this ).slider( "value" ) + " months";
				$( this ).find('.ui-slider-handle').text( text );
			},
			slide: function( event, ui ) {
				var text = ui.value + " months";
				$( this ).find('.ui-slider-handle').text( text );
			}
		});

	}

});

// Toggle Navigation Fixed State 
function toggleFixedNav(target) {
	if ($(window).scrollTop() >= $(target).parent().offset().top) {
		$(target).addClass('fixed');
	} else {
		$(target).removeClass('fixed');
	}
}