/* 
 * Affiniture Cards Limited - Instalment_Loan
 * js/Loan.js - v0.1
 * JS Class to calculate interest and repayment schedule for loan from principal and monthly interest rate
 * 
 * Copyright 2017 Affiniture Cards Limited
 */

function Loan(rate, principal, term, fees, type) {
	this.rate = rate;
	this.principal = principal;
	this.term = term;
	this.fees = fees;
	this.type = type;
	
	this.repayments;
	this.totalLoan;
	this.totalInterest;
	this.totalPayments;

	this.init = function() {
		// Define default type value
		if (!this.type) {
			this.type = 'interestPrincipal'
		}
		this.calculate();        
	};

	this.reset = function() {
		this.repayments = [];
		this.totalLoan = this.principal + this.fees;
		this.totalInterest = 0;
		this.totalPayments = 0;        
	};

	this.calculate = function() {
		this.reset();

		for(var i = 0; i < this.term; i++) {
			var repayment = {};
			
			if (this.type == 'interestPrincipal') {
				if (i == 0) {
					repayment.open = this.totalLoan;
				} else {
					repayment.open = this.repayments[i-1].close;
				}

				repayment.interest = repayment.open * this.rate;
				repayment.loan = this.totalLoan / this.term;
			}
			
			else if (this.type == 'interestOnly') {
				repayment.interest = this.totalLoan * this.rate;

				if (i == this.term - 1) {
					repayment.loan = this.totalLoan;
				}
				else {
					repayment.loan = 0;
				}
			}

			repayment.month = i+1;
			repayment.payment = repayment.interest + repayment.loan;
			
			if (this.type == 'interestPrincipal') {
				repayment.close = repayment.open + repayment.interest - repayment.payment;
			}

			this.totalInterest += repayment.interest;
			this.totalPayments += repayment.payment;

			this.repayments.push(repayment);
		}
	};

	this.updatePrincipal = function(principal) {
		this.principal = principal;
		this.calculate();
	};

	this.updateTerm = function(term) {
		this.term = term;
		this.calculate();
	};

	this.APR = function() {
		return ((Math.pow((1 + this.rate), 12) - 1) * 100).toFixed(3) + "%";
	}

	this.init();
 }
