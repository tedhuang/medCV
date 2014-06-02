var  medCV = function () {

    "use strict";

    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();
    var labelWidth = 150;

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
        var sleep =[["1999-05-01", 14], ["2004-05-01", 30], ["2007-05-01", 45], ["2009-05-01", 84], ["2012-05-01", 84]];

        var med =[["1999-05-01", 0], ["2004-05-01", 1], ["2007-05-01", 3], ["2009-05-01", 3], ["2012-05-01", 1]];

        drawGraph("sleep", sleep);
        drawGraph("medication", med);


        // var med_taken = [["1999-05-01", "Foo"], ["1999-05-01", "Bar"], ["1999-05-01", "Baz"]
        //                  ["2004-05-01", "Ruffle"],
        //                  ["2009-05-01", "Rack"],
        //                  ["2012-05-01", "Rackspace"], ["2012-05-01", "Jingle"]];
        // drawNoteGraph("medication", med);
    }

    function drawGraph(placeholder, rawData){
        var min = rawData[0][0];
        var max = rawData[rawData.length-1][0];
        $.each(rawData, function(i, data){
            data[0] = convertDateToTimestamp(data[0]);
        });
        var data = [
            { label: placeholder, data: rawData, points: { fillColor: "#4572A7", size: 5 }, color: '#4572A7' }
        ];
        var options ={
          xaxis: {
                min: convertDateToTimestamp(min),
                max: convertDateToTimestamp(max),
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
                position: "right"
            }
        };
        var plot = $("."+placeholder+" > .graph").plot(data, options).data("plot");

    }

    function drawNoteGraph(placeholder, rawData) {
        var min = rawData[0][0];
        var options ={
          xaxis: {
                min: convertDateToTimestamp(min),
                max: (new Date(2013, 11, 1)).getTime(),
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
                max: 4,
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
                position: "right"
            },
            comment: {
                show: true
            },
            comments: [
                {x: convertDateToTimestamp("2003-02-01"), y: 1, contents: "Foo", color: "blue"},
                {x: convertDateToTimestamp("2003-02-01"), y: 2, contents: "Foo", color: "blue"},
                {x: convertDateToTimestamp("2004-02-01"), y: 1, contents: "Foo", color: "green"},
                {x: convertDateToTimestamp("2006-02-01"), y: 1, contents: "Foo", color: "blue"}
            ]
        }
        var plot = $("."+placeholder+" > .graph").plot(rawData, options).data("plot");
    }

    function convertDateToTimestamp(myDate){
        myDate=myDate.split("-");
        var newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];//month/date year
        return new Date(newDate).getTime();
    }

    $(function() {
        initialize();
    });

    return {
    };
}();
