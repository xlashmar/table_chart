<?php

/**
 * @file
 * Contains table_chart_plugin_display_extender_attributes.
 */

class table_chart_plugin_display_extender_attributes extends views_plugin_display_extender {

  function options_definition_alter(&$options) {
    $options['attributes'] = array('default' => array());
  }

  function options_summary(&$categories, &$options) {
    $libraries = $this->display->get_option('libraries');
    $options['attributes'] = array(
      'category' => 'other',
      'title' => t('Attributes'),
      'value' => !empty($attributes) ? t('Attributes added'): t('None'),
//      'value' => !empty($attributes) ? $this->getAttributesSummary($attributes) : t('None'),
    );
  }

  /**
   * Given an array of libraries, convert them into simple 'summary' text.
   */
  protected function getAttributesSummary(array $attributes) {
    // @todo change the array
    $attribute_list = array();
    foreach ($attributes as $key) {
//      list($module, $name) = explode(':', $key, 2);
//      if ($library = drupal_get_library($module, $name)) {
//        $library_names[] = check_plain($library['title']);
//      }
    }

//    return implode(', ', $library_names);
  }

  function options_form(&$form, &$form_state) {
    if ($form_state['section'] == 'attributes') {
      $form['#title'] .= t('The attributes added to the display wrapper.');
      $attributes = $this->display->get_option('attributes');
      $form['attributes'] = array(
        '#type' => 'textarea',
        '#title' => t('Attributes to add to this display\'s wrapper'),
        '#description' => t('Attributes to add to the display wrapper element. Add then in key|value pairs. Note that <em>class</em> and <em>id</em> attributes are not allowed in this list.'),
        '#default_value' => $attributes,
      );
    }
  }

//  function options_submit(&$form, &$form_state) {
//    if ($form_state['section'] == 'attributes') {
//      // Select boxes filter out empty values, so don't need to array_filter().
//      $libraries = array_keys($form_state['values']['attributes']);
//      $this->display->set_option('attributes', $attributes);
//    }
//  }
}
