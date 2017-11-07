<?php

namespace Drupal\table_chart\Plugin\views\display_extender;

use Drupal\views\Plugin\views\display_extender\DisplayExtenderPluginBase;
use Drupal\core\form\FormStateInterface;


/**
 * Plugin extender for the table charts attributes.
 *
 * @ingroup views_display_extender_plugins
 *
 * @ViewsDisplayExtender(
 *   id = "table_chart",
 *   title = @Translation("Table Charts"),
 *   help = @Translation("Allows table charts configurations to be added to views."),
 *   no_ui = FALSE
 * )
 */
class TableChart extends DisplayExtenderPluginBase {

  /**
   * {@inheritdoc}
   */
  public function defineOptionsAlter(&$options) {
    $options['table_chart'] =  array(
      'contains' => array(
        'attributes' => array('default' => ''),
        'charting_library' => array('default' => ''),
      )
    );
  }

  /**
   * {@inheritdoc}
   */
  public function optionsSummary(&$categories, &$options) {
    $charting_options = table_chart_current_installed_charting_library();
    $attributes = $this->options['attributes'];
    $charting_library =  $this->options['charting_library'];
    $options['attributes'] = array(
      'category' => 'other',
      'title' => t('Data Attributes'),
      'value' => !empty($attributes) ? $this->t('Attributes added'): $this->t('none'),
    );
    $options['charting_library'] = array(
      'category' => 'other',
      'title' => t('Charting library'),
      'value' => !empty($charting_library) ? $charting_options[$charting_library] : $this->t('none'),
    );
  }


  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    if ($form_state->get('section') == 'attributes') {
      $attributes = $this->options['attributes'];

      $form['table_chart']['attributes'] = array(
        '#type' => 'textarea',
        '#title' => $this->t('Data attributes to add to this display\'s wrapper and fields.'),
        '#description' => $this->t('Add one data attribute per line. The data-* will automatically be prepended to your attribute definition. Leave out the wrapping quotes around the value since Drupal will add those automatically. (e.g. mydata=custom data turns into data-mydata="custom data")'),
        '#default_value' => $attributes,
      );
    }
    elseif($form_state->get('section') == 'charting_library') {
      $charting_library = $this->options['charting_library'];
      $form['table_chart']['charting_library'] = array(
        '#type' => 'select',
        '#title' => $this->t('Select the charting library.'),
        '#description' => $this->t('Select the charting Library you wish to use. Current supported options are chartist and morrisjs'),
        '#default_value' => $charting_library,
        '#options' => table_chart_current_installed_charting_library(),
      );
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitOptionsForm(&$form, FormStateInterface $form_state) {
    if ($form_state->get('section') == 'attributes') {
      $attributes = $form_state->getValue('attributes');
      $this->options['attributes'] = $attributes;
    }
    if ($form_state->get('section') == 'charting_library') {
      $charting_library = $form_state->getValue('charting_library');
      $this->options['charting_library'] = $charting_library;
    }
  }
}
