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
    if ($form_state['section'] == 'chartlib_selector') {
      $form['#title'] .= t('Data chartlib added to the display wrapper.');
      $chartlib_selector = $this->display->get_option('chartlib_selector');
      $form['chartlib1'] = array(
        '#type' => 'radio',
        '#title' => t('MorrisJS'),
        '#description' => t('Add one data attribute per line. The data-* will automatically be prepended to your attribute definition. Leave out the wrapping quotes around the value since Drupal will add those automatically. (e.g. mydata=custom data turns into data-mydata="custom data")'),
        '#default_value' => $chartlib_selector,
      );
      $form['chartlib2'] = array(
        '#type' => 'radio',
        '#title' => t('ChartistJS'),
        '#description' => t('Add one data attribute per line. The data-* will automatically be prepended to your attribute definition. Leave out the wrapping quotes around the value since Drupal will add those automatically. (e.g. mydata=custom data turns into data-mydata="custom data")'),
        '#default_value' => $chartlib_selector,
      );
    }
  }

  function options_submit(&$form, &$form_state) {
    if ($form_state['section'] == 'chartlib_selector') {
      $chartlib_selector = $form_state['values']['chartlib'];
      $this->display->set_option('chartlib_selector', $chartlib_selector);
    }
  }
}
