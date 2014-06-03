// rayh: taking inspiration from d3-timeline and making a similar-styled step-chart
(function() {
  d3.sparkline = function() {

    // settings
    var beginning = 0,
        ending = 0,
        width = null,
        height = null,
        ymax = 100,
        ymin = 0,
        margin = {left: 30, right:30, top: 5, bottom:30},
        itemHeight = 5,
        itemMargin = 3,
        tickFormat = { format: d3.time.format("%I %p"),
        tickTime: d3.time.hours,
        tickInterval: 1,
        tickSize: 6 }
      ;

    function sparkline(gParent) {
      var g = gParent.append("g");
      var gParentItem = d3.select(gParent[0][0]);


      var width = gParentItem.attr("width");
      var height = gParentItem.attr("height") - margin.top - margin.bottom;

      var xScaleFactor = (1/(ending - beginning)) * (width);
      var yScaleFactor = (1/(ymax - ymin)) * (height);

      // draw the axis
      var xScale = d3.time.scale()
        .domain([beginning, ending])
        .range([0, width]);

      var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickFormat(tickFormat.format)
        .ticks(tickFormat.tickTime, tickFormat.tickInterval)
        .tickSize(tickFormat.tickSize);

      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 0 +","+(margin.top+height)+")")
        .call(xAxis);


      var lineFunction = d3.svg.line()
          .interpolate("step-after")           // <=== THERE IT IS!
          .x(function(d) { return getXPos(d); })
          .y(function(d) { return getYPos(d); });

      g.each(function(d) {
        g.append("path")
         .attr("d", lineFunction(d))
         .attr("stroke", "blue")
         .attr("stroke-width", 2)
         .attr("fill", "none");
      });

      function getXPos(d) {
        return (d[0] - beginning) * xScaleFactor;
        // return margin.left + (d.starting_time - beginning) * xScaleFactor;
      }

      function getYPos(d) {
        return margin.top + (height - (d[1] * yScaleFactor));
      }
    }

    sparkline.beginning = function(begin) {
      beginning = begin;
      return sparkline;
    }


    sparkline.ending = function(end) {
      ending = end;
      return sparkline;
    }

    sparkline.tickFormat = function (format) {
      if (!arguments.length) return tickFormat;
      tickFormat = format;
      return sparkline;
    };


    return sparkline;
  }
})();
