var  medCV = function () {

    var minTime = convertDateToTimestamp("1998-11-01");
    var maxTime = convertDateToTimestamp("2014-06-06");


    "use strict";

    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();
    var labelWidth = 150;

    var sleep = [["1999-05-01", 14], ["2004-05-01", 30], ["2007-05-01", 45], ["2009-05-01", 84], ["2012-05-01", 84], ["2014-06-01", 84]];

    $(window).resize(function() {
        viewportWidth = $(window).width();
        viewportHeight = $(window).height();
        console.log("resize: "+viewportWidth);
        $(".graph").width(viewportWidth-labelWidth-5);
    });


    function initialize(){

        $(".graph").width(viewportWidth-labelWidth-5); //set graph width

        //TODO: load data

        //graph
        // var sleep = [["1999-05-01", 14], ["2004-05-01", 30], ["2007-05-01", 45], ["2009-05-01", 84], ["2012-05-01", 84]];

        var med =[["1999-05-01", 0], ["2004-05-01", 1], ["2007-05-01", 3], ["2009-05-01", 3], ["2012-05-01", 1]];

        var sleep_detailed = [{
                name: "Difficulty Falling Asleep in Evening",
                frequency: [["1999-05-01", 2], ["2004-05-01", 3], ["2007-05-01", 4], ["2009-05-01", 4], ["2012-05-01", 3]],
                severity: [["1999-05-01", 2], ["2004-05-01", 2], ["2007-05-01", 4], ["2009-05-01", 4], ["2012-05-01", 3]]
            },
            {
                name: "Sleepiness during day",
                frequency: [["1999-05-01", 4], ["2004-05-01", 4], ["2007-05-01", 4], ["2009-05-01", 4], ["2012-05-01", 4]],
                severity: [["1999-05-01", 3], ["2004-05-01", 3], ["2007-05-01", 3], ["2009-05-01", 3], ["2012-05-01", 3]]
            },
            {
                name: "Awakenings",
                frequency: [["1999-05-01", 4], ["2004-05-01", 3], ["2007-05-01", 3], ["2009-05-01", 3], ["2012-05-01", 4]],
                severity: [["1999-05-01", 2], ["2004-05-01", 3], ["2007-05-01", 3], ["2009-05-01", 4], ["2012-05-01", 3]]
            },
            {
                name: "Timing : How irregular is your child's sleep?",
                // frequency: (?)[["1999-05-01", 4], ["2004-05-01", 3], ["2007-05-01", 3], ["2009-05-01", 3], ["2012-05-01", 4]],
                severity: [["1999-05-01", 4], ["2004-05-01", 4], ["2007-05-01", 4], ["2009-05-01", 4], ["2012-05-01", 4]]
            },
            {
                name: "Breathing: how much of a problem?",
                frequency: [["1999-05-01", 2], ["2004-05-01", 2], ["2007-05-01", 2], ["2009-05-01", 2], ["2012-05-01", 2]],
                severity: [["1999-05-01", 1], ["2004-05-01", 1], ["2007-05-01", 2], ["2009-05-01", 3], ["2012-05-01", 3]]
            }
        ];



        var diagnosis_data = [
          {label: "Gross Motor Skills", times: [
              {"starting_time": convertDateToTimestamp("1999-05-01"), "ending_time": convertDateToTimestamp("2004-05-01")},
              {"starting_time": convertDateToTimestamp("2004-05-01"), "ending_time": convertDateToTimestamp("2007-05-01")}]},
          {label: "Adaptive Behavior", times: [
              {"starting_time": convertDateToTimestamp("2004-05-01"), "ending_time": convertDateToTimestamp("2007-05-01")},
              {"starting_time": convertDateToTimestamp("2007-05-01"), "ending_time": convertDateToTimestamp("2009-05-01")},
              {"starting_time": convertDateToTimestamp("2009-05-01"), "ending_time": convertDateToTimestamp("2012-05-01")},
              {"starting_time": convertDateToTimestamp("2012-05-01"), "ending_time": convertDateToTimestamp("2014-05-01")}
          ]},
          {label: "Attention", times: [
              {"starting_time": convertDateToTimestamp("2004-05-01"), "ending_time": convertDateToTimestamp("2007-05-01")},
              {"starting_time": convertDateToTimestamp("2007-05-01"), "ending_time": convertDateToTimestamp("2009-05-01")},
              {"starting_time": convertDateToTimestamp("2009-05-01"), "ending_time": convertDateToTimestamp("2012-05-01")},
              {"starting_time": convertDateToTimestamp("2012-05-01"), "ending_time": convertDateToTimestamp("2014-05-01")}
          ]},
          {label: "Fine Motor Skills", times: [
              {"starting_time": convertDateToTimestamp("1999-05-01"), "ending_time": convertDateToTimestamp("2004-05-01")},
          ]},
          {label: "Achievement", times: [
              {"starting_time": convertDateToTimestamp("2007-05-01"), "ending_time": convertDateToTimestamp("2009-05-01")},
              {"starting_time": convertDateToTimestamp("2009-05-01"), "ending_time": convertDateToTimestamp("2012-05-01")},
              {"starting_time": convertDateToTimestamp("2012-05-01"), "ending_time": convertDateToTimestamp("2014-05-01")}
          ]},
          {label: "Executive Functioning", times: [
              {"starting_time": convertDateToTimestamp("2007-05-01"), "ending_time": convertDateToTimestamp("2009-05-01")}
          ]},
          {label: "Sensory Problems", times: [
              {"starting_time": convertDateToTimestamp("2012-05-01"), "ending_time": convertDateToTimestamp("2014-05-01")}
          ]},
          {label: "Bipolar", times: [
              {"starting_time": convertDateToTimestamp("2012-05-01"), "ending_time": convertDateToTimestamp("2014-05-01")}
          ]},
          {label: "General Anxiety Disorder", times: [
              {"starting_time": convertDateToTimestamp("2009-05-01"), "ending_time": convertDateToTimestamp("2014-05-01")}
          ]},
        ];

        drawGraph("sleep", sleep);
        drawGraph("medication", med);
        drawNoteGraph("medication", med);
        drawFamilyGraph("family", med);
        drawTimeline();

        var chart = d3.timeline()
            .beginning(convertDateToTimestamp("1999-05-01"))
            .ending(convertDateToTimestamp("2014-05-01"))
            .tickFormat({
              format: d3.time.format("20%y"),
              tickTime: d3.time.years,
              tickInterval: 2,
              tickSize: 6
            })
            .itemHeight(20)
            .itemMargin(1)
            .margin({top: 0, bottom: 0, left: 0, right: 0})
            .stack();

        d3.select("#diag-overview").append("svg").attr("width", 1091).datum(diagnosis_data).call(chart);
    }

    function drawTimeline(){
        $(".timeline").height("30px");
        var min = sleep[0][0];
        var max = sleep[sleep.length-1][0];
        var data = [
            { label: "", data: sleep }
        ];
        var options ={
          xaxis: {
                min: min,
                max: max,
                mode: "time",
                tickSize: [1, "year"],
                tickLength: 0,
                axisLabel: 'Month',
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                axisLabelPadding: 5
            },
            yaxis: {
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                axisLabelPadding: 5,
                show:false
            },
            series: {
                lines: {
                    show: false
                }
            },
            grid: {
                borderWidth: 1
            },
            legend: {
                labelBoxBorderColor: "none",
                position: "right"
            }
        };
        var plot = $(".timeline").plot(data, options).data("plot");
    }

    function drawGraph(placeholder, rawData){
        $.each(rawData, function(i, data){
            data[0] = convertDateToTimestamp(data[0]);
        });
        var data = [
            { label: placeholder, data: rawData, points: { fillColor: "#4572A7", size: 5 }, color: '#4572A7' }
        ];
        var options ={
          xaxis: {
                min: minTime,
                max: maxTime,
                mode: "time",
                tickSize: [1, "year"],
                tickLength: 0,
                axisLabel: 'Month',
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                axisLabelPadding: 5
            },
            yaxis: {
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                axisLabelPadding: 5
            },
            series: {
                lines: {
                    show: true,
                    fill: true,
                    steps: true
                }
            },
            grid: {
                borderWidth: 1
            },
            legend: {
                labelBoxBorderColor: "none",
                position: "left"
            }
        };
        var plot = $("."+placeholder+" > .graph > .overview").plot(data, options).data("plot");

    }

    function drawFamilyGraph(placeholder, rawData) {
        var options ={
          xaxis: {
                min: minTime,
                max: maxTime,
                mode: "time",
                tickSize: [1, "year"],
                tickLength: 0,
                axisLabel: 'Month',
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                axisLabelPadding: 5
            },
            yaxis: {
                min: 0,
                max: 6,
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                axisLabelPadding: 5
            },
            series: {
                lines: {
                    show: true,
                    fill: true,
                    steps: true
                }
            },
            grid: {
                borderWidth: 1
            },
            legend: {
                labelBoxBorderColor: "none",
                position: "left"
            },
            comment: {
                show: true
            },
            comments: [
                {x: convertDateToTimestamp("1999-05-13"), y: 0, contents: "Other Family", color: "green"},
                {x: convertDateToTimestamp("1999-08-01"), y: 1, contents: "Strong family bonds", color: "blue"},

                {x: convertDateToTimestamp("2004-05-01"), y: 0, contents: "Other Family", color: "green"},
                {x: convertDateToTimestamp("2004-05-01"), y: 1, contents: "Strong family bonds", color: "blue"},

                {x: convertDateToTimestamp("2007-05-01"), y: 0, contents: "Other Family", color: "green"},
                {x: convertDateToTimestamp("2007-05-01"), y: 1, contents: "Strong family bonds", color: "blue"},

                {x: convertDateToTimestamp("2009-05-01"), y: 0, contents: "Strong family bonds", color: "blue"},
                {x: convertDateToTimestamp("2009-05-01"), y: 1, contents: "Difficulties Related to Child's Disability", color: "black"},


                {x: convertDateToTimestamp("2012-05-01"), y: 0, contents: "Community Organization", color: "green"},
                {x: convertDateToTimestamp("2012-05-01"), y: 1, contents: "Difficulties Related to Child's Disability", color: "black"},
                {x: convertDateToTimestamp("2012-05-01"), y: 2, contents: "Relationship Difficulties in my family", color: "black"},
            ]
        }
        var plot = $("."+placeholder+" > .graph > .overview").plot(rawData, options).data("plot");

        // hack all the titles

    }

    function drawNoteGraph(placeholder, rawData) {
        var options ={
          xaxis: {
                min: minTime,
                max: maxTime,
                mode: "time",
                tickSize: [1, "year"],
                tickLength: 0,
                axisLabel: 'Month',
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                axisLabelPadding: 5
            },
            yaxis: {
                min: 0,
                max: 7,
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                axisLabelPadding: 5
            },
            series: {
                lines: {
                    show: true,
                    fill: true,
                    steps: true
                }
            },
            grid: {
                borderWidth: 1
            },
            legend: {
                labelBoxBorderColor: "none",
                position: "left"
            },
            comment: {
                show: true
            },
            comments: [
                {x: convertDateToTimestamp("1999-05-01"), y: 0, contents: "Supplements", color: "green"},

                {x: convertDateToTimestamp("2004-05-01"), y: 0, contents: "Supplements", color: "green"},

                {x: convertDateToTimestamp("2007-05-01"), y: 1, contents: "Catapres", color: "gray"},
                {x: convertDateToTimestamp("2007-05-01"), y: 3, contents: "Ritalin", color: "red"},
                {x: convertDateToTimestamp("2007-05-01"), y: 2, contents: "Seroquel", color: "blue"},
                {x: convertDateToTimestamp("2007-05-01"), y: 0, contents: "Supplements", color: "green"},

                {x: convertDateToTimestamp("2009-05-01"), y: 1, contents: "Catapres", color: "gray"},
                {x: convertDateToTimestamp("2009-05-01"), y: 3, contents: "Risperdal", color: "blue"},
                {x: convertDateToTimestamp("2009-05-01"), y: 4, contents: "Ritalin", color: "red"},
                {x: convertDateToTimestamp("2009-05-01"), y: 5, contents: "Prozac", color: "black"},
                {x: convertDateToTimestamp("2009-05-01"), y: 0, contents: "Supplements", color: "green"},
                {x: convertDateToTimestamp("2009-05-01"), y: 2, contents: "Seroquel", color: "blue"},
                // hidden because of too much data

                {x: convertDateToTimestamp("2012-05-01"), y: 1, contents: "Catapres", color: "gray"},
                {x: convertDateToTimestamp("2012-05-01"), y: 2, contents: "Abilify", color: "blue"},
                {x: convertDateToTimestamp("2012-05-01"), y: 3, contents: "Concerta", color: "red"},
                {x: convertDateToTimestamp("2012-05-01"), y: 4, contents: "Lamictal", color: "orange"},
                {x: convertDateToTimestamp("2012-05-01"), y: 0, contents: "Supplements", color: "green"},
                {x: convertDateToTimestamp("2012-05-01"), y: 5, contents: "Tradazone", color: "black"},
            ]
        }
        var plot = $("."+placeholder+" > .graph > .overview").plot(rawData, options).data("plot");

        // hack all the titles
    }

    function convertDateToTimestamp(myDate){
        myDate=myDate.split("-");
        var newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];//month/date year
        return new Date(newDate).getTime();
    }

    $(function() {
        initialize();

        $(document).ready(function(){
            $(".category-label.expandable").on('click', function(){
                $(this).parents(".chart").toggleClass("EXPANDED");
                $(this).siblings(".graph").find(".overview").toggle();
                $(this).siblings(".graph").find(".detailed").toggle();
            });
            $(".category-label.swappable").on('click', function(){
                $(this).siblings(".graph").find(".overview").toggle();
                $(this).siblings(".graph").find(".detailed").toggle();
            });

        });

        $('.notch').toggle()

    });

    return {
    };
}();
