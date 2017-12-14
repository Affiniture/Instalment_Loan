/* 
 * Affiniture Cards Limited - instalmentweb
 * js/legacy.css - v1.1
 * JS to control legacy components (header, navigation, footer)
 * 
 * Copyright 2017 Affiniture Cards Limited
 */

var mobileDetect = mobileDetect();
var browser = BrowserDetect.browser;
var bVersion = BrowserDetect.version;

$(document).ready(function () {
    //mobileDetect = 'mobile';

    if (mobileDetect == 'desktop' && browser == 'Explorer' && bVersion < 8) {
        if (typeof ($.cookie("oldBrowser")) == 'undefined') {
            $.cookie("oldBrowser", true);
            window.location = '/upgradebrowser.aspx';
        }
    }

    /*-MENU-CLICK-*/
	menuClick();
	setLoginDialog();
	setMobileMenu();

    /*-DOWNLOAD BTN-*/
    $('.footer-links .download').unbind().bind('click', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).find('.app-links').slideUp();
        }
        else {
            $(this).addClass('open');
            $(this).find('.app-links').slideDown();
        }
	});

});


//-------------------------------------------------------------Added
function setLoginDialog() {
	
	$('.header-top .log-in').unbind().bind('click', function () {
	    if (!$(this).hasClass('loginActive')) {
	        $(this).addClass('loginActive');
	    } else {
	        $(this).removeClass('loginActive');
	    }
		var menu = $('.header-top .log-in ul.options');
		if(menu.is(':visible')) {
			menu.removeClass('visible').fadeOut(100);
		}
		else {
			menu.addClass('visible').fadeIn('slow');
		}
	});
	
}
//-------------------------------------------------------------Added
function menuClick() {
	/*-MENU-CLICK-*/
	if(mobileDetect != 'desktop') {
		$('.header-menu ul.menu li.main').unbind().bind('click', function(){
			if($(this).hasClass('active')) {
				$('.header-menu ul.menu li.main').removeClass('active');
				$('.header-menu ul.menu li.main ul.sub').hide();
			}
			else {
				$('.header-menu ul.menu li.main').removeClass('active');
				$('.header-menu ul.menu li.main ul.sub').hide();
				$(this).addClass('active');
				$(this).find('ul.sub').show();
			}
		});
	}
	else {
		$('.header-menu ul.menu li.main').hover(function() {
			$(this).addClass('active');
			if($(this).find('ul.sub').length > 0) {
				$(this).find('ul.sub').show();
				$(this).find('ul.sub li a').hover(function() {
					$(this).addClass('active');
				},function() {
					$(this).removeClass('active');
				});
			}
		},function() {
			$(this).removeClass('active');
			if($(this).find('ul.sub').length > 0) {
				$(this).find('ul.sub').hide();
			}
		});
	}
}

//------------------------------------------------------------------
function setMobileMenu(){
	$('.wrapper .header-menu a.m-menu-toggle').unbind().bind('click', function(){
		if($(this).hasClass('blue')){
			hideMobileMenu();
		}
		else {
			showMobileMenu();
		}
	});
	
	toggleArrowButton('.wrapper .m-menu a.main');
	
	$('.wrapper .m-menu .log-in').unbind().bind('click', function () {
	    if (!$(this).hasClass('loginActive')) {
	        $(this).addClass('loginActive');
	    } else {
	        $(this).removeClass('loginActive');
	    }
		var menu = $('.wrapper .m-menu .log-in ul.options');
		if(menu.is(':visible')) {
			menu.removeClass('visible').slideUp(100);
		}
		else {
			menu.addClass('visible').slideDown('slow');
		}
	});
}

//------------------------------------------------------------------
function showMobileMenu() {
	$('.wrapper .header-menu a.m-menu-toggle').addClass('blue');
	$('.wrapper .header-menu a.m-menu-close').show();
	$('.wrapper .m-menu').slideDown();
	$('.wrapper .header-banner').slideUp();
}

//------------------------------------------------------------------
function hideMobileMenu() {
	$('.wrapper .header-menu a.m-menu-toggle').removeClass('blue');
	$('.wrapper .header-menu a.m-menu-close').hide();
	$('.wrapper .m-menu').slideUp();
	$('.wrapper .header-banner').slideDown();
}

//------------------------------------------------------------------
function toTop() {
	$('body,html').animate({ scrollTop: 0	}, 800);
}

//------------------------------------------------------------------
function toggleArrowButton(target) {
	$(target).unbind().bind('click', function(){
		if($(this).children('i.arrow').hasClass('open')){
			$(this).children('i.arrow').removeClass('open');
			$(this).next('ul').slideUp();
			if(mobileDetect != 'desktop') {
				$(this).removeClass('active');
			}
		}
		else {
			$(this).children('i.arrow').addClass('open');
			$(this).next('ul').slideDown();
			if(mobileDetect != 'desktop') {
				$(this).addClass('active');
			}
		}
	});
}

//------------------------------------------------------------------
function mobileDetect() {
	
	//var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
	var userAgent = navigator.userAgent.toLowerCase();
	var ismobile = (/iphone|ipod|android|blackberry|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase()));
	var istablet = (/ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()));
	var isIpad = (/ipad/i.test(navigator.userAgent.toLowerCase()));
	
	if(istablet || (userAgent.search("android") > -1) && !(userAgent.search("mobile") > -1)) {
		
		if(isIpad) {
			return 'ipad';
		}
		
		return 'tablet';
	}
	
	if(ismobile) {
		return 'mobile';
	}
	
	return 'desktop';
}