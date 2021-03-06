<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(

	'*' => array(
		'siteName' => 'Instalment Loan',
		'defaultWeekStartDay' => 1,
		'enableCsrfProtection' => true,
		'omitScriptNameInUrls' => true,
		'cpTrigger' => 'cmsadmin',
		'devMode' => false,
		'sendPoweredByHeader' => false,
		'phpSessionName' => 'ACLSessionId',
	),
		
	// Local Dev Environment
	'localhost' => array(
		'devMode' => true,
		'environmentVariables' => array(
			'assetsBasePath' => '/Applications/XAMPP/xamppfiles/htdocs/instalmentloan/assets/',
			'assetsBaseUrl' => 'http://localhost/instalmentloan/assets/',
			'staticBaseUrl' => 'http://localhost/instalmentloan/static',
		),
	),

	// Staging Environment
	'instalmentloan-staging.xxf82npcdk.eu-west-1.elasticbeanstalk.com' => array(
		'devMode' => true,
	),

	// Production Environment
	'prod.dinersclub' => array(
		'devMode' => false,
	),

);
