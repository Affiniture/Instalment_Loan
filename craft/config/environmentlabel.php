<?php

/**
 * EnvironmentLabel config.php
 *
 * @author    Tom Davies <tom@madebykind.com>, Michael Rog <michael@michaelrog.com>
 * @copyright Copyright (c) 2016, Kind
 * @see       https://github.com/madebykind/craft.labelenvironment
 * @package   craft.plugins.environmentlabel
 * @since     2.0
 */

return array(
	'*' => array(
		'label' => CRAFT_ENVIRONMENT,
		'suffix' => ' Environment',
		'labelColor' => '#477196',
	),

	'localhost' => array(
		'label' => 'Instalment Loan Development',
		'showLabel' => true,
	),

	'instalmentloan-staging.xxf82npcdk.eu-west-1.elasticbeanstalk.com' => array(
		'label' => 'Instalment Loan Staging',
		'showLabel' => true,
	),

	'prod.dinersclub' => array(
		'showLabel' => false,
	),

);