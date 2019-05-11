<?php

/**
 * @file
 * Contains table_chart_plugin_library_selector.
 */

/**
 * Table to Chart Library Selector.
 */
class table_chart_plugin_library_selector extends views_plugin_display_extender {

  /**
   * {@inherit}
   */
  public function option_definition() {
    $options = parent::option_definition();
    $options['charting_library'] = "morrisjs";
    return $options;
  }

  public function options_definition_alter(&$options) {
    $options['charting_library'] = array(
      'default' => 'morrisjs',
    );
    return $options;
  }

  /**
   * {@inherit}
   */
  public function options_summary(&$categories, &$options) {
    parent::options_summary($categories, $options);
    $options['charting_library'] = array(
      'category' => 'other',
      'title' => t('Chart Library Selector'),
      'description' => t('Add data chartlib to your display wrapper and fields.'),
      'value' => ($this->display->get_option('charting_library')) ? $this->display->get_option('charting_library') : 'None',
    );
  }

  /**
   * {@inherit}
   */
  public function options_form(&$form, &$form_state) {
    $options = array(
      'tabletochart-chartistjs' => t('Use the Chartist.js library to generate your charts.'),
      'chartistjs' => t('Use the Chartist.js library to generate your charts.'),
      'morrisjs' => t('Use the Morris.js library to generate your charts.'),
    );
    if ($form_state['section'] == 'charting_library') {
      $form['#title'] .= t('Data chartlib added to the display wrapper.');
      $form['chartlibselector'] = array(
        '#type' => 'radios',
        '#title' => t('Select a chart library'),
        '#options' => $options,
        '#description' => t('The chart library is the engine that you can use to generate charts with the given data from the views.  Note that the libraries should be installed.'),
        '#default_value' => $this->display->get_option('charting_library'),
      );
    }
  }

  /**
   * {@inherit}
   */
  public function options_submit(&$form, &$form_state) {
    if ($form_state['section'] == 'charting_library') {
      $charting_library = $form_state['values']['chartlibselector'];
      $this->display->set_option('charting_library', $charting_library);
    }
  }

}
