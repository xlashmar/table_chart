<?php

/**
 * @file
 * Contains table_chart_plugin_library_selector.
 */

class table_chart_plugin_library_selector extends views_plugin_display_extender {
  // this is a testviews_plugin_display_extender x
  function options_definition_alter(&$options) {
      $options['chartlib_selector'] = array('default' => array());
  }
  
  function options_summary(&$categories, &$options) {
    $chartlib_selector = $this->display->get_option('chartlib_selector');
    $options['chartlib_selector'] = array(
      'category' => 'other',
      'title' => t('Chart Library Selector'),
      'description' => t('Add data chartlib to your display wrapper and fields.'),
      'value' => !empty($chartlib_selector) ? t('chartlib added'): t('None'),
    );
  }

  function options_form(&$form, &$form_state) {
    $options = array(
      'morrisjs' => t('Use the MorrisJS library to generate your charts.'), 
      'chartistjs' => t('Use the ChartistJS library to generate your charts.'),
    );
    if ($form_state['section'] == 'chartlib_selector') {
      $form['#title'] .= t('Data chartlib added to the display wrapper.');
      $chartlib_selector = $this->display->get_option('chartlib_selector');
      $form['chartlibselector'] = array(
        '#type' => 'radios',
        '#title' => t('Select a chart library'),
        '#options' => $options,
        '#description' => t('The chart library is the engine that you can use to generate charts with the given data from the views.  Note that the libraries should be installed.'),
        '#default_value' => $options['morrisjs'],
      );
    }
  }

  function options_submit(&$form, &$form_state) {
    drupal_set_message("Target Dir: ".$form_state['section']);
    if ($form_state['section'] == 'chartlib_selector') {
      $chartlib_selector = $form_state['values']['chartlibselector'];
      $this->display->set_option('chartlib_selector', $chartlib_selector);
    }
  }
}
