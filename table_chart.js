(function($) {
  Drupal.behaviors.table_chart = {
    attach: function(context, settings) {
      var count = 0;
      $('.table-chart').each(function(){
        count++;
        $(this).once('.table-chart').each(function(){
          var wrapper = $(this);
          var table = wrapper.find('table');

          var charting_library = drupalSettings.table_chart.charting_library;
          // Check if the charting library and based on that formulate the table from the json object to how we can formulate it.
          switch(charting_library) {
            case 'chartist':
              chartist(wrapper, table, count);
              break;
            case 'morrisjs':
              morrisJs(wrapper, table, count);
              break;
          }
        });
      });
    }
  };

  // Chartist data formulate data.
  function chartist(wrapper, table, count) {
    var options = {};
    var headings = [];
    var data_labels = [];
    var data_series = [];

    $(table).find("thead tr th").each(function(){
      headings.push($(this).text());
    });

    var table_data = table.tableToJSON();
    // Fist element in the headings will the labels and the 2 and plus items will the series.
    $(table_data).each(function() {
      $(this).each(function(i) {
        $.each($(this)[i], function(key, value) {
          // Check if its first heading element.
          var first_element = $(headings).first();
          if (first_element[0] == key) {
            // first heading element so make it a label element.
            data_labels.push(value);
          }
          else {
            var item_array = $.inArray(key, headings);
            // negate 1 to remote the first table label element.
            item_array = item_array - 1;
            if (typeof data_series[item_array] === 'undefined') {
              data_series[item_array] = [];
              data_series[item_array].push(value);
            }
            else {
              data_series[item_array].push(value);
            }
          }
        });
      });
    });

    // Create the chartis json object to create the markup.
    var data = {
      labels: data_labels,
      series: data_series,
    };

    var optKeys = [
      ['seriesBarDistance', 'int', 15],
      ['low', 'int', undefined],
      ['high', 'int', undefined],
      ['width', 'str', undefined],
      ['height', 'str', undefined],
      ['referenceValue', 'int', 0],
      ['stackBars', 'bool', false],
      ['stackMode', 'str', 'accumulate'],
      ['horizontalBars', 'bool', false],
      ['distributeSeries', 'bool', false],
      ['reverseData', 'bool', false],
      ['showGridBackground', 'bool', false],
      ['showLine', 'bool', true],
      ['showPoint', 'bool', true],
      ['showArea', 'bool', false],
      ['areaBase', 'int', 0],
      ['lineSmooth', 'bool', true],
      ['showGridBackground', 'bool', false],
      ['fullWidth', 'bool', false],
      ['reverseData', 'false', false],
      ['chartPadding', 'int', 5],
      ['startAngle', 'int', 0],
      ['total', 'int', undefined],
      ['donut', 'bool', false],
      ['donutSolid', 'bool', false],
      ['donutWidth', 'bool', 60],
      ['showLabel', 'bool', true],
      ['labelOffset', 'int', 0],
      ['labelPosition', 'str', 'inside'],
      ['labelDirection', 'str', 'neutral'],
      ['reverseData', 'bool', false],
      ['ignoreEmptyValues', 'bool', false],
    ];

    options = generateOptionsList(optKeys, table, 'chartist');

    // Prepare display
    table.addClass('hidden');

    wrapper.append('<div class="table-chart-chartist-div"></div>');
    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object.
    var chartType = table.data('chartist-type');

    // If the variable was not set the default to line chart type.
    if (typeof chartType == 'undefined') {
      chartType = 'line';
    }

    switch(chartType.toLowerCase()) {
      case 'bar':
        new Chartist.Bar('.table-chart-chartist-div', data, options);
        break;
      case 'line':
        new Chartist.Line('.table-chart-chartist-div', data, options);
        break;
      case 'pie':
        // The pie data is formulated differently.
        var pie_data = {
          series: data_series[0],
        };
        new Chartist.Pie('.table-chart-chartist-div', pie_data, options);
        break;
    }
  }

  // Morris js data formulating.
  function morrisJs(wrapper, table, count) {
    // Chart settings.
    var options = {};
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

    options = generateOptionsList(optKeys, table, 'morris');
    options.element = 'morris-chart-' + count;
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
    table.addClass('hidden');
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
  }

  function generateOptionsList(optKeys, table, charting_type) {
    var options = [];
        // Extract settings from data attributes if provided.
    $.each(optKeys, function(idx, optData) {
      var key = optData[0],
      type = optData[1],
      defaultValue = optData[2];

      // Check for original camel case and lowercase data attribute names, as some browsers lowercase the attribute names.
      var attrKey = null
      if (table.data(charting_type + '-' + key)) {
        attrKey = key;
      }
      else if (table.data(charting_type + '-' + key.toLowerCase())) {
        attrKey = key.toLowerCase();
      }

      if (attrKey !== null) {
        if (type == 'str') {
          options[key] = table.data(charting_type + '-' + attrKey);
        }
        else if (type == 'bool') {
          options[key] = !!table.data(charting_type + '-' + attrKey);
        }
        else if (type == 'int') {
          options[key] = parseInt(table.data(charting_type + '-' + attrKey), 10);
        }
        else if (type == 'float') {
          options[key] = parseFloat(table.data(charting_type + '-' + attrKey));
        }
        else if (type == 'array') {
          options[key] = table.data(charting_type + '-' + attrKey).split(',');
        }
      }
      else {
        options[key] = defaultValue;
      }
    });
    return options;
  }



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
