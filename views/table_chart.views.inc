<?php

/**
 * @file
 * Views integration for the table_chart module.
 */

/**
 * Implements hook_views_plugins().
 */
function table_chart_views_plugins() {
  $plugins = array();
  $plugins['display_extender']['attributes'] = array(
    'title' => t('Attributes'),
    'help' => t('Allows attributes to be added to views.'),
    'handler' => 'table_chart_plugin_display_extender_attributes',
    'enabled' => TRUE,
  );
  $plugins['chart_library']['library_selector'] = array(
    'title' => t('chartlibrary'),
    'help' => t('Allows table chart library to be selected'),
    'handler' => 'table_chart_plugin_library_selector',
    'enabled' => TRUE,
  );

  return $plugins;
}

