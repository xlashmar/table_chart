(function($) {
  Drupal.behaviors.table_chart = {
    attach: function(context, settings) {
      var table = $('.view-display-id-dropfort_um_update_status_code_pane table').tableToJSON();
      console.log(JSON.stringify(table));
      $('.view-display-id-dropfort_um_update_status_code_pane').append('<div id="myfirstchart" style="height: 250px;"></div>');
      // @todo replace with data from table
      new Morris.Line({
        element: 'myfirstchart',
        data: [
            { year: '2008', value: 20 },
            { year: '2009', value: 10 },
            { year: '2010', value: 5 },
            { year: '2011', value: 5 },
            { year: '2012', value: 20 }
          ],
          // The name of the data record attribute that contains x-values.
          xkey: 'year',
          // A list of names of data record attributes that contain y-values.
          ykeys: ['value'],
          // Labels for the ykeys -- will be displayed when you hover over the
          // chart.
          labels: ['Value']
      });
    }
  };
}(jQuery));