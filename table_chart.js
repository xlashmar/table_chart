(function($) {
  Drupal.behaviors.table_chart = {
    attach: function(context, settings) {
      var table_data = $('.view-display-id-dropfort_um_update_status_code_pane table').tableToJSON();
      console.log(JSON.stringify(table_data));
      $('.view-display-id-dropfort_um_update_status_code_pane').append('<div id="myfirstchart" style="height: 250px;"></div>');
      var result = [];

      for(var i in table_data) {
        result.push([i, table_data [i]]);
      }

          
      // @todo replace with data from table
      new Morris.Donut({
        element: 'myfirstchart',
        data: result,
          // The name of the data record attribute that contains x-values.
//          xkey: 'year',
          // A list of names of data record attributes that contain y-values.
//          ykeys: ['value'],
          // Labels for the ykeys -- will be displayed when you hover over the
          // chart.
//          labels: ['Value']
      });
    }
  };
}(jQuery));