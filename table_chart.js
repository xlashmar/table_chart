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
          var table_data = table.tableToJSON();
          var keys = [];
      
          // Get the list of keys
          for (var i in table_data) {
            for (var j in table_data[i]) {
              keys.push(j);
            }
            break;
          }

          table.addClass('element-invisible');
          wrapper.append('<div id="morris-chart-'+count+'" class="morris-chart" style="height: 250px;"></div><a href="#" class="button toggle-table fa fa-table">' + Drupal.t("Show data") + '</a>');
      
          // @todo figure out how to load settings for this stuff.
          new Morris.Bar({
            element: 'morris-chart-'+count,
            data: table_data,
              // The name of the data record attribute that contains x-values.
              xkey: keys.shift(),
              // A list of names of data record attributes that contain y-values.
              ykeys: keys,
              // Labels for the ykeys -- will be displayed when you hover over the
              // chart.
              labels: keys,
              hideHover: false,
              barColors: ['#0B62A4', '#25567B','#043E6B','#3F92D2','#66A3D2']
          });

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
}(jQuery));