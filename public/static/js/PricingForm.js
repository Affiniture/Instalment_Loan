/* 
 * Affiniture Cards Limited - Instalment_Loan
 * js/PricingForm.js - v0.1
 * JS Class to initialise Loan product, control sliders and display calculations from loan product
 * 
 * Copyright 2017 Affiniture Cards Limited
 */

function PricingForm(pricingForm) {
	this.formContainer = pricingForm;
	this.loan = {};

	this.principalMin = 0;
	this.principalMax = 0;
	this.principalInit = 0;
	this.principalSteps = 0;
	this.termMin = 0;
	this.termMax = 0;
	this.termInit = 0;
	this.fees = 0;
	this.rate = 0;
	this.productType = 'interestPrincipal';

	// Initialise Form
	this.init = function() {

		// Set initial values
		this.principalMin = parseInt($(this.formContainer).attr('data-principal-min'));
		this.principalMax = parseInt($(this.formContainer).attr('data-principal-max'));
		this.principalInit = parseInt($(this.formContainer).attr('data-principal-init'));
		this.principalSteps = parseInt($(this.formContainer).attr('data-principal-steps'));
		this.termMin = parseInt($(this.formContainer).attr('data-term-min'));
		this.termMax = parseInt($(this.formContainer).attr('data-term-max'));
		this.termInit = parseInt($(this.formContainer).attr('data-term-init'));
		this.fees = parseInt($(this.formContainer).attr('data-fees'));
		this.rate = parseFloat($(this.formContainer).attr('data-interest-rate'));
		this.productType = $(this.formContainer).attr('data-product-type');

		// Construct loan instance
		this.loan = new Loan(this.rate, this.principalInit, this.termInit, this.fees, this.productType);

		// Initialise Sliders
		this.initSliders();

		// Initialise Mobile Input
		this.initMobileInput();

		// Bind Submit handler
		this.bindSubmitHandler();

		// Initial Refresh of Form Display
		this.updateDisplay();
	};

	this.bindSubmitHandler = function () {
		// Bind "this.loan" to local variable to access within callback functions
		var loan = this.loan
		// On submit event
		$(this.formContainer).submit(function(e) {
			// Set hidden input values to the loan values
			$(this).find('input[name=amount]').val(loan.principal);
			$(this).find('input[name=term]').val(loan.term);

			// Find loading modal in container
			var modal = $(this).find('.loading-modal').parent();
			if (modal.length > 0) {
				// Display modal box to ask users to wait during redirect
				$(modal).fadeToggle();
				// Set body to not scroll
				$('body').css('overflow', 'hidden');
			}
		});
	}

	this.initSliders = function () {
		// Bind "this" to local variable to access within callback functions
		var form = this;

		// Initialise Principal Slider
		$(form.formContainer).find(".pricing-form-slider-principal").slider({
			range: "max",
			min: form.principalMin,
			max: form.principalMax,
			step: form.principalSteps,
			value: form.principalInit,
			animate: true,
			create: function() {
				var text = "£" + form.principalInit;
				$( this ).find('.ui-slider-handle').text( text );
			},
			slide: function (event, ui) {
				var text = "£" + ui.value;
				$(ui.handle).text( text );
		
				// Update Principal Value
				form.loan.updatePrincipal(ui.value);

				// Update Mobile Form input incase breakpoint changes
				$(this.formContainer).find('.pricing-form-input-principal').val(ui.value)

				// Update Display
				form.updateDisplay();
			}
		});

		// Initialise Term Slider
		$(form.formContainer).find(".pricing-form-slider-term").slider({
			range: "max",
			min: form.termMin,
			max: form.termMax,
			value: form.termInit,
			animate: true,
			create: function() {
				var text = form.termInit + " mths";
				$( this ).find('.ui-slider-handle').text( text );
			},
			slide: function (event, ui) {
				var text = ui.value + " mths";
				$(ui.handle).text( text );
		
				// Update Term Value
				form.loan.updateTerm(ui.value);

				// Update Mobile Form input incase breakpoint changes
				$(this.formContainer).find('.pricing-form-input-term').val(ui.value)

				// Update Display
				form.updateDisplay();
			}
		});
	}

	this.initMobileInput = function () {
		// Bind "this" to local variable to access within callback functions
		var form = this;
		
		// Principal Mobile Input
			var principalMobileInput = $(this.formContainer).find('.pricing-form-input-principal')
			// Set initial value
			$(principalMobileInput).val(this.principalInit);
			// Set min and max values
			$(principalMobileInput).attr('min', this.principalMin);
			$(principalMobileInput).attr('max', this.principalMax);

			// Click handler to update principal amount
			$(principalMobileInput).change(function () {
				form.loan.updatePrincipal( parseInt($(this).val()) );
				form.updateDisplay();
			});

		// Term Mobile Input
			var termMobileInput = $(this.formContainer).find('.pricing-form-input-term');
			// Create month options
			for(var i = this.termMin; i <= this.termMax; i++) {
				$(termMobileInput).append('<option value="' + i + '">' + i + ' Months</option>');
			}
			// Set initial term
			$(termMobileInput).val(this.termInit);

			// Click handler to update term value
			$(termMobileInput).change(function () {
				console.log($(this).val());
				form.loan.updateTerm( parseInt($(this).val()) );
				form.updateDisplay();
			});
	}

	this.updateDisplay = function () {
		this.updateOverview();
		this.updateRepaymentsTable();
	};

	this.updateOverview = function () {
		$(this.formContainer).find('.pricing-form-overview-borrowing').text(accounting.formatMoney(this.loan.principal, "£"));
		$(this.formContainer).find('.pricing-form-overview-fees').text(accounting.formatMoney(this.loan.fees, "£"));
		$(this.formContainer).find('.pricing-form-overview-interest').text(accounting.formatMoney(this.loan.totalInterest, "£"));
		$(this.formContainer).find('.pricing-form-overview-repay').text(accounting.formatMoney(this.loan.totalPayments, "£"));
		$(this.formContainer).find('.pricing-form-overview-apr').text(this.loan.APR());
	};

	this.updateRepaymentsTable = function () {		
		var repaymentsTable = $(this.formContainer).find('.pricing-form-repayments tbody');
		$(repaymentsTable).empty();
	
		$(this.loan.repayments).each(function() {
			var row = '<tr>\
			<th scope="row">' + this.month + '</th>\
			<td>' + accounting.formatMoney(this.loan, "£")  + '</td>\
			<td>' + accounting.formatMoney(this.interest, "£")  + '</td>\
			<td>' + accounting.formatMoney(this.payment, "£")  + '</td>\
			</tr>';
	
			$(repaymentsTable).append(row);
		});
	};

	this.init();
};

$.fn.pricingForm = function () {
	return new PricingForm(this);
}