Table to Chart
==============

Convert a table of data to a chart with Morris.js

Usage
-----

### Automatic
1. Add the class "table-chart" to the wrapping element around your table
2. Ensure the table_chart library is included
    - drupal_add_library('table_chart', 'table_chart');
3. You have a chart!

### Views
1. Use the Views to generate your table
2. Add the class "table-chart" to your view
3. Attach the library to the view
    - Easiest way is to use the [library_attach](https://drupal.org/project/library_attach) module.
4. You have a chart!

### Data Attributes

You can control the display of the chart and the columns used using data attributes on your table and columns. Here are the available options:

#### Chart settings
morris-colors
: Comma separated list of colors. Hex values (including the # symbol) or a default color (red, green, blue, etc...)

#### Data settings
For more details on each option see https://github.com/lightswitch05/table-to-json

tabletojson-ignoreColumns
: Comma separated list of columns to ignore. Use index values starting at zero (0) (e.g. Ignore the first, third and sixth columns - 0,2,5)

tabletojson-onlyColumns
: Comma separated list of columns to include. 

tabletojson-ignoreHiddenRows
: Boolean value. Set to "true" or "false" accordingly. (e.g. data-tabletojson-ignoreHiddenRows=true)

tabletojson-headings
: Comma separated list of headings to use. See https://github.com/lightswitch05/table-to-json for more details.
