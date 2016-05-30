# dwg.js

A CAD like tool based on [two.js](https://github.com/jonobr1/two.js).
Visit [www.iknot.org/dwgjs](www.iknot.org/dwgjs) to see the examples.

# Usage



    <!doctype html>
    <html>
    <head>
    <meta charset="utf-8">
    <script src="js/dwg.min.js"></script>
    <script>
      $().ready(function() {
        wrapper = $("#svgWrapper");
        wrapper.dwg();
        $("#btnLine").click(function() {
          wrapper.dwg("line")
        });
      })
    </script>
    </head>
    <body>
        <a id="btnLine" class="btn btn-default">Line</a>
        <div id="svgWrapper"></div>
    </body>
    </html>

# Methods

* point
* line
* rect
* circle
* ellipse
* star
* polygon
* curve
* closedcurve
* clear
* exit
