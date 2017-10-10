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
 *   id = "attributes",
 *   title = @Translation("Attributes"),
 *   help = @Translation("Allows attributes to be added to views."),
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
      )
    );
  }

  /**
   * {@inheritdoc}
   */
  public function optionsSummary(&$categories, &$options) {
    $attributes = $this->options['attributes'];
    $options['attributes'] = array(
      'category' => 'other',
      'title' => t('Data Attributes'),
      'value' => !empty($attributes) ? $this->t('Attributes added'): $this->t('none'),
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
  }

  /**
   * {@inheritdoc}
   */
  public function submitOptionsForm(&$form, FormStateInterface $form_state) {
    if ($form_state->get('section') == 'attributes') {
      $attributes = $form_state->getValue('attributes');
      $this->options['attributes'] = $attributes;
    }
  }
}
