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
    $attributes = $this->display->get_option('attributes');
    $options['attributes'] = array(
      'category' => 'other',
      'title' => t('Attributes'),
      'value' => !empty($attributes) ? t('Attributes added'): t('None'),
    );
  }

  function options_form(&$form, &$form_state) {
    if ($form_state['section'] == 'attributes') {
      $form['#title'] .= t('The attributes added to the display wrapper.');
      $attributes = $this->display->get_option('attributes');
      $form['attributes'] = array(
        '#type' => 'textarea',
        '#title' => t('Attributes to add to this display\'s wrapper'),
        '#description' => t('Add one attribute per line (e.g. data-mydata=custom data). Leave out the wrapping quotes around the value since Drupal will add those automatically. Note that <em>class</em> and <em>id</em> attributes are not allowed in this list.'),
        '#default_value' => $attributes,
      );
    }
  }

  function options_submit(&$form, &$form_state) {
    if ($form_state['section'] == 'attributes') {
      $attributes = $form_state['values']['attributes'];
      $this->display->set_option('attributes', $attributes);
    }
  }
}
