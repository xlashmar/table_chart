(function($) {
  Drupal.behaviors.table_chart = {
    attach: function(context, settings) {
      var count = 0;
      $('.table-chart').each(function(){
        count++;
        $(this).once(function(){
          // @todo figure out how to find the table
          // @todo figure out how to find the table settings
          var wrapper = $(this);
          var table = wrapper.find('table');
          
          // Chart settings
          var options = {};
          options.element = 'morris-chart-' + count;
          options.colors = table.data('morris-colors') ? table.data('morris-colors').split(',') : null;
          options.resize = table.data('morris-resize') ? true == table.data('morris-resize') : false;
          options.type = table.data('morris-type') ? table.data('morris-type') : 'line';

          // Data settings
          options.ignoreColumns = table.data('tabletojson-ignorecolumns') ? table.data('tabletojson-ignorecolumns').split(',') : [];
          options.onlyColumns = table.data('tabletojson-onlyColumns') ? table.data('tabletojson-onlyColumns').split(',') : null;
          options.ignoreHiddenRows = table.data('tabletojson-ignoreHiddenRows') ? true == table.data('tabletojson-ignoreHiddenRows') : true;
          options.headings = table.data('tabletojson-headings') ? table.data('tabletojson-headings').split(',') : null;
          options.keys = [];

          // Data preperation
          
          // Ensure all the values are true integers and not string numbers
          options.ignoreColumns = options.ignoreColumns.map(function (x) { 
              return parseInt(x, 10); 
          });
          
          // Read the table data with the given configuration
          options.table_data = table.tableToJSON({
            ignoreColumns: options.ignoreColumns,
            onlyColumns: options.onlyColumns,
            ignoreHiddenRows: options.ignoreHiddenRows,
            headings: options.headings
          });

          // Get the list of keys
          for (var i in options.table_data) {
            for (var j in options.table_data[i]) {
              options.keys.push(j);
            }
            break;
          }

          // Prepare display
          table.addClass('element-invisible');
          wrapper.append('<div id="' + options.element + '" class="morris-chart" style="height: 250px;"></div><a href="#" class="button toggle-table fa fa-table">' + Drupal.t("Show data") + '</a>');
          
          // Draw the chart with the given options
          drawChart(options);

          wrapper.find('.button.toggle-table').click(function(event){
            table.toggleClass('element-invisible');
            if (table.hasClass('element-invisible')) {
              $(this).text(Drupal.t('Show Data'));
            }
            else {
              $(this).text(Drupal.t('Hide Data'));
            }
            event.preventDefault();
          });
        });
      });
    }
  };
  
  /**
   * Generate the chart with the given defaults
   */
  function drawChart(options) {
    // Set global settings
    var settings = {
      element: options.element,
      data: options.table_data,
      resize: options.resize
    };

    // Set per-type settings
    switch (options.type) {
      case 'bar':
        if (null !== options.colors && options.colors != undefined) {
          settings.barColors = options.colors;
        }
        settings.xkey = options.keys.shift();
        settings.ykeys = options.keys;
        settings.labels = options.keys;
        settings.hideHover = false;
        new Morris.Bar(settings);
        break;
      case 'donut':
        if (null !== options.colors && options.colors != undefined) {
          settings.colors = options.colors;
        }
        new Morris.Donut(settings);

        break;
      case 'area':
        // @todo adjust area settings
        new Morris.Area(settings);

        break;
      case 'line':
      default:
        // @todo adjust line settings
        new Morris.Line(settings);
    }
  }
}(jQuery));