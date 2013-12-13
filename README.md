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