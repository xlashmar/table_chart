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
          var colors = table.data('morris-colors') ? table.data('morris-colors').split(',') : null;
          var responsive = table.data('morris-responsive') ? true == table.data('morris-responsive') : false;
          var type = table.data('morris-type') ? table.data('morris-type') : 'line';

          // Data settings
          var ignoreColumns = table.data('tabletojson-ignorecolumns') ? table.data('tabletojson-ignorecolumns').split(',') : [];
          var onlyColumns = table.data('tabletojson-onlyColumns') ? table.data('tabletojson-onlyColumns').split(',') : null;
          var ignoreHiddenRows = table.data('tabletojson-ignoreHiddenRows') ? true == table.data('tabletojson-ignoreHiddenRows') : true;
          var headings = table.data('tabletojson-headings') ? table.data('tabletojson-headings').split(',') : null;
          var keys = [];

          // Data preperation
          
          // Ensure all the values are true integers and not string numbers
          ignoreColumns = ignoreColumns.map(function (x) { 
              return parseInt(x, 10); 
          });
          
          // Read the table data with the given configuration
          var table_data = table.tableToJSON({
            ignoreColumns: ignoreColumns,
            onlyColumns: onlyColumns,
            ignoreHiddenRows: ignoreHiddenRows,
            headings: headings
          });

          // Get the list of keys
          for (var i in table_data) {
            for (var j in table_data[i]) {
              keys.push(j);
            }
            break;
          }

          // Prepare display
          table.addClass('element-invisible');
          wrapper.append('<div id="morris-chart-'+count+'" class="morris-chart" style="height: 250px;"></div><a href="#" class="button toggle-table fa fa-table">' + Drupal.t("Show data") + '</a>');
          var settings = {
            element: 'morris-chart-'+count,
            data: table_data,
            responsive: responsive
          };

          switch (type) {
          case 'bar':
            if (null !== colors && colors != undefined) {
              settings.barColors = colors;
            }
            settings.xkey = keys.shift();
            settings.ykeys = keys;
            settings.labels = keys;
            settings.hideHover = false;
            new Morris.Bar(settings);
            break;
          case 'donut':
            if (null !== colors && colors != undefined) {
              settings.colors = colors;
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
    // @todo move the chart generator into here so we can make the charts redraw live.
  }
}(jQuery));