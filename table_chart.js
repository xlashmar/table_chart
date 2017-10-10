(function($) {
  Drupal.behaviors.table_chart = {
    attach: function(context, settings) {
      var count = 0;
      $('.table-chart').each(function(){
        count++;
        $(this).once('.table-chart').each(function(){
          var wrapper = $(this);
          var table = wrapper.find('table');

          // Chart settings.
          var options = {};
          options.element = 'morris-chart-' + count;
          // List of settings along with their type and default value.
          var optKeys = [
            ['colors', 'array', null],
            ['stacked', 'bool', false],
            ['resize', 'bool', false],
            ['type', 'str', 'line'],
            ['lineWidth', 'str', null],
            ['pointSize', 'str',null],
            ['pointFillColors', 'str', null],
            ['pointStrokeColors', 'str', null],
            ['ymax', 'str', null],
            ['ymin', 'str', null],
            ['smooth', 'bool', true],
            ['hideHover', 'bool', false],
            ['hoverCallback', 'str', null],
            ['parseTime', 'bool', true],
            ['postUnits', 'str', null],
            ['preUnits', 'str', null],
            ['dateFormat', 'str', null],
            ['xLabels', 'str', null],
            ['xLabelFormat', 'str', null],
            ['yLabelFormat', 'str', null],
            ['goals', 'array', null],
            ['goalStrokeWidth', 'str', null],
            ['goalLineColors', 'array', null],
            ['events', 'str', null],
            ['eventStrokeWidth', 'str', null],
            ['eventLineColors', 'array', null],
            ['continuousLine', 'str', null],
            ['axes', 'bool', true],
            ['grid', 'bool', true],
            ['gridTextColor', 'str', null],
            ['gridTextSize', 'int', null],
            ['gridTextFamily', 'str', null],
            ['gridTextWeight', 'str', null],
            ['fillOpacity', 'float', null],
            ['behaveLikeLine', 'bool', null],
            ['xkey', 'str', null],
            ['ykeys', 'array', []],
            ['labels', 'array', null]
          ];

          // Extract settings from data attributes if provided.
          $.each(optKeys, function(idx, optData) {
            var key = optData[0],
                type = optData[1],
                defaultValue = optData[2];

            // Check for original camel case and lowercase data attribute names, as some browsers lowercase the attribute names.
            var attrKey = null
            if (table.data('morris-' + key)) {
              attrKey = key;
            }
            else if (table.data('morris-' + key.toLowerCase())) {
              attrKey = key.toLowerCase();
            }

            if (attrKey !== null) {
              if (type == 'str') {
                options[key] = table.data('morris-' + attrKey);
              }
              else if (type == 'bool') {
                options[key] = !!table.data('morris-' + attrKey);
              }
              else if (type == 'int') {
                options[key] = parseInt(table.data('morris-' + attrKey), 10);
              }
              else if (type == 'float') {
                options[key] = parseFloat(table.data('morris-' + attrKey));
              }
              else if (type == 'array') {
                options[key] = table.data('morris-' + attrKey).split(',');
              }
            }
            else {
              options[key] = defaultValue;
            }
          });

          // Data settings.

          // Ignoring the first column (i.e. 0) has some odd behavior. Zero (0)
          // being misinterpreted as the emtpy array value. So we treat this
          // case separately.
          if (table.data('tabletojson-ignoreColumns') == 0) {
            options.ignoreColumns = [0];
          }
          else {
            options.ignoreColumns = table.data('tabletojson-ignoreColumns') ? String(table.data('tabletojson-ignoreColumns')).split(',') : [];
          }
          // Same issue as above
          if (table.data('tabletojson-onlyColumns') == 0) {
            options.onlyColumns = [0];
          }
          else {
            options.onlyColumns = table.data('tabletojson-onlyColumns') ? table.data('tabletojson-onlyColumns').split(',') : null;
          }
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
          wrapper.append('<div id="' + options.element + '" class="morris-chart" style="height: 250px;"></div> <a href="#" class="button toggle-table" title="'+ Drupal.t("Toggle Data Table") +'">' + Drupal.t("Show data") + '</a>');

          // Draw the chart with the given options
          drawChart(options);

          wrapper.find('.button.toggle-table').click(function(event){
            table.toggleClass('element-invisible');
            $(this).toggleClass('down');
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
        // Add optional settings
        if (null !== options.colors && options.colors != undefined) {
          settings.barColors = options.colors;
        }
        if (options.stacked) {
            settings.stacked = options.stacked;
        }
        else {
          settings.stacked = settings.stacked;
        }
        if (null !== options.hideHover) {
          settings.hideHover = options.hideHover;
        }
        if (null !== options.hoverCallback) {
          settings.hoverCallback = options.hoverCallback;
        }
        if (null !== options.axes) {
          settings.axes = options.axes;
        }
        if (null !== options.grid) {
          settings.grid = options.grid;
        }
        if (null !== options.gridTextColor) {
          settings.gridTextColor = options.gridTextColor;
        }
        if (null !== options.gridTextSize) {
          settings.gridTextSize = options.gridTextSize;
        }
        if (null !== options.gridTextFamily) {
          settings.gridTextFamily = options.gridTextFamily;
        }
        if (null !== options.gridTextWeight) {
          settings.gridTextWeight = options.gridTextWeight;
        }
        if (null !== options.hideHover) {
          settings.hideHover = options.hideHover;
        }

        // Add required settings
        if (null != options.xkey) {
          settings.xkey = options.xkey;
        }
        else {
          settings.xkey = options.keys.shift();
        }

        if (options.ykeys.length > 0) {
          settings.ykeys = options.ykeys;
        }
        else {
          settings.ykeys = options.keys;
        }

        if (null != options.labels) {
          settings.labels = options.labels;
        }
        else {
          settings.labels = settings.ykeys;
        }

        new Morris.Bar(settings);
        break;
      case 'donut':
        if (null !== options.colors && options.colors != undefined) {
          settings.colors = options.colors;
        }
        if (null !== options.formatter) {
          settings.formatter = options.formatter;
        }
        new Morris.Donut(settings);

        break;
      case 'area':
        // Add optional settings
        if (null !== options.behaveLikeLine) {
          settings.behaveLikeLine = options.behaveLikeLine;
        }

        // Area and Line share all the same configuration except the one option
        // So we fall into the default case and check at the end which type to
        // generate.
      case 'line':
      default:
        // Add optional settings

        if (null !== options.colors && options.colors != undefined) {
          settings.lineColors = options.colors;
        }

        // Add required settings
        if (null != options.xkey) {
          settings.xkey = options.xkey;
        }
        else {
          settings.xkey = options.keys.shift();
        }

        if (options.ykeys.length > 0) {
          settings.ykeys = options.ykeys;
        }
        else {
          settings.ykeys = options.keys;
        }

        if (null != options.labels) {
          settings.labels = options.labels;
        }
        else {
          settings.labels = settings.ykeys;
        }

        // @todo adjust line settings
        if (options.type == 'area') {
          new Morris.Area(settings);
        }
        else {
          new Morris.Line(settings);
        }
    }
  }
}(jQuery));
