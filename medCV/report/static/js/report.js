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
        $(".graph").width(viewportWidth-labelWidth-5);
        $(".detail-chart").width(viewportWidth-labelWidth-5); //set graph width
    });

    var timeline_axis = d3.sparkline()
        .beginning(minTime)
        .ending(maxTime)
        .tickFormat({
          format: d3.time.format("20%y"),
          tickTime: d3.time.years,
          tickInterval: 2,
          tickSize: 2
        })


    function initialize(){

        var footerHeight = $(window).height() - $(".info").position().top
        if (footerHeight < 150) {
            footerHeight = 150;
        }
        console.log(footerHeight)
        $(".info").height(footerHeight)

        $(".graph").width(viewportWidth-labelWidth-5); //set graph width
        $(".detail-chart").width(viewportWidth-labelWidth-5); //set graph width

        //TODO: load data

        //graph
        // var sleep = [["1999-05-01", 14], ["2004-05-01", 30], ["2007-05-01", 45], ["2009-05-01", 84], ["2012-05-01", 84]];

        var med =[["1999-05-01", 0], ["2004-05-01", 1], ["2007-05-01", 3], ["2009-05-01", 3], ["2012-05-01", 1]];

        var sleep_detailed = [{
                className: "bedtime",
                name: "Difficulty Falling Asleep in Evening",
                frequency: [["1999-05-01", 2], ["2004-05-01", 3], ["2007-05-01", 4], ["2009-05-01", 4], ["2012-05-01", 3]],
                severity: [["1999-05-01", 2], ["2004-05-01", 2], ["2007-05-01", 4], ["2009-05-01", 4], ["2012-05-01", 3]]
            },
            {
                className: "sleepiness",
                name: "Sleepiness during day",
                frequency: [["1999-05-01", 4], ["2004-05-01", 4], ["2007-05-01", 4], ["2009-05-01", 4], ["2012-05-01", 4]],
                severity: [["1999-05-01", 3], ["2004-05-01", 3], ["2007-05-01", 3], ["2009-05-01", 3], ["2012-05-01", 3]]
            },
            {
                className: "awakenings",
                name: "Awakenings",
                frequency: [["1999-05-01", 4], ["2004-05-01", 3], ["2007-05-01", 3], ["2009-05-01", 3], ["2012-05-01", 4]],
                severity: [["1999-05-01", 2], ["2004-05-01", 3], ["2007-05-01", 3], ["2009-05-01", 4], ["2012-05-01", 3]]
            },
            {
                className: "timing",
                name: "Timing : How irregular is your child's sleep?",
                frequency: [["1999-05-01", 4], ["2004-05-01", 3], ["2007-05-01", 3], ["2009-05-01", 3], ["2012-05-01", 4]],
                severity: [["1999-05-01", 4], ["2004-05-01", 4], ["2007-05-01", 4], ["2009-05-01", 4], ["2012-05-01", 4]]
            },
            {
                className: "breathing",
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
              {"starting_time": convertDateToTimestamp("2012-05-01"), "ending_time": convertDateToTimestamp("2014-06-01")}
          ]},
          {label: "Attention", times: [
              {"starting_time": convertDateToTimestamp("2004-05-01"), "ending_time": convertDateToTimestamp("2007-06-01")},
              {"starting_time": convertDateToTimestamp("2007-05-01"), "ending_time": convertDateToTimestamp("2009-06-01")},
              {"starting_time": convertDateToTimestamp("2009-05-01"), "ending_time": convertDateToTimestamp("2012-06-01")},
              {"starting_time": convertDateToTimestamp("2012-05-01"), "ending_time": convertDateToTimestamp("2014-06-01")}
          ]},
          {label: "Fine Motor Skills", times: [
              {"starting_time": convertDateToTimestamp("1999-05-01"), "ending_time": convertDateToTimestamp("2004-05-01")},
          ]},
          {label: "Achievement", times: [
              {"starting_time": convertDateToTimestamp("2007-05-01"), "ending_time": convertDateToTimestamp("2009-06-01")},
              {"starting_time": convertDateToTimestamp("2009-05-01"), "ending_time": convertDateToTimestamp("2012-06-01")},
              {"starting_time": convertDateToTimestamp("2012-05-01"), "ending_time": convertDateToTimestamp("2014-06-01")}
          ]},
          {label: "Executive Functioning", times: [
              {"starting_time": convertDateToTimestamp("2007-05-01"), "ending_time": convertDateToTimestamp("2009-05-01")}
          ]},
          {label: "Sensory Problems", times: [
              {"starting_time": convertDateToTimestamp("2012-05-01"), "ending_time": convertDateToTimestamp("2014-06-01")}
          ]},
        ];

        var diagnosis_classifier = [
          {label: "Bipolar", times: [
              {"starting_time": convertDateToTimestamp("2012-05-01"), "ending_time": convertDateToTimestamp("2014-06-01")}
          ]},
          {label: "General Anxiety Disorder", times: [
              {"starting_time": convertDateToTimestamp("2009-05-01"), "ending_time": convertDateToTimestamp("2014-06-01")}
          ]},
        ];

        // drawGraph("sleep", sleep);
        graphWidth = $("#diag-overview").parents(".graph").width() - 40
        
        drawGraph("medication", med);
        d3.select(".medication .graph").append("svg").attr("width", graphWidth).attr("height", 30).style("margin-left", 24).datum([]).call(timeline_axis);
        drawNoteGraph("medication", med);
        drawFamilyGraph("family", med);
        d3.select(".family .graph").append("svg").attr("width", graphWidth).attr("height", 30).style("margin-left", 24).datum([]).call(timeline_axis);

        //drawTimeline();

        var sparkline = d3.sparkline()
            .beginning(minTime)
            .ending(maxTime)
            .tickFormat({
              format: d3.time.format("20%y"),
              tickTime: d3.time.years,
              tickInterval: 2,
              tickSize: 2
            })

        var sleep_data = [["1999-05-01", 14], ["2004-05-01", 30], ["2007-05-01", 45], ["2009-05-01", 84], ["2012-05-01", 84], ["2014-06-01", 84]];
        sleep_data.forEach(function(e) { e[0] = convertDateToTimestamp(e[0]);});
        graphWidth = $("#sleep-overview").parents(".graph").width() - 40

        d3.select("#sleep-overview")
          .append("svg").attr("width", graphWidth)
          .attr("height", 150)
          .datum(sleep_data)
          .call(sparkline);

        var chart = d3.timeline()
            .showAxis(true)
            .beginning(minTime)
            .ending(maxTime)
            .tickFormat({
              format: d3.time.format("20%y"),
              tickTime: d3.time.years,
              tickInterval: 2,
              tickSize: 2
            })
            .itemHeight(18)
            .itemMargin(1)
            .margin({top: 0, bottom: 0, left: 0, right: 0})
            .stack();

        var axisLessChart = d3.timeline()
            .showAxis(false)
            .beginning(minTime)
            .ending(maxTime)
            .tickFormat({
              format: d3.time.format("20%y"),
              tickTime: d3.time.years,
              tickInterval: 2,
              tickSize: 2
            })
            .itemHeight(18)
            .itemMargin(1)
            .margin({top: 0, bottom: 0, left: 0, right: 0})
            .stack();

        graphWidth = $("#diag-overview").parents(".graph").width() - 40
        d3.select("#diag-overview > #diag1").append("svg").attr("width", graphWidth).datum(diagnosis_data).call(axisLessChart);
        d3.select("#diag-overview > #diag2").append("svg").attr("width", graphWidth).datum(diagnosis_classifier).call(chart);

        $.each(sleep_detailed, function(i, d){
            drawDoubleLineGraph(d);
        });
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
                axisLabelPadding: 5,
                show: false
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
                axisLabelPadding: 5,
                show: false
            },
            yaxis: {
                min: 0,
                max: 6,
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                axisLabelPadding: 5,
                show: false
            },
            series: {
                lines: {
                    show: true,
                    fill: true,
                    steps: true
                }
            },
            grid: {
                borderWidth: 1,
                show: false
            },
            legend: {
                labelBoxBorderColor: "none",
                position: "left"
            },
            comment: {
                show: true
            },
            comments: [
                {x: convertDateToTimestamp("1999-06-10"), y: 0, contents: "Other Family", color: "green"},
                {x: convertDateToTimestamp("1999-08-25"), y: 1, contents: "Strong family bonds", color: "blue"},

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
                axisLabelPadding: 5,
                show: false
            },
            yaxis: {
                min: 0,
                max: 7,
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                axisLabelPadding: 5,
                show: false
            },
            series: {
                lines: {
                    show: true,
                    fill: true,
                    steps: true
                }
            },
            grid: {
                borderWidth: 1,
                show: false
            },
            legend: {
                labelBoxBorderColor: "none",
                position: "left"
            },
            comment: {
                show: true
            },
            comments: [
                {x: convertDateToTimestamp("1999-06-10"), y: 0, contents: "Supplements", color: "green"},

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


                {x: convertDateToTimestamp("2012-05-01"), y: 0, contents: "Supplements", color: "green"},
                {x: convertDateToTimestamp("2012-05-01"), y: 1, contents: "Catapres", color: "gray"},
                {x: convertDateToTimestamp("2012-05-01"), y: 2, contents: "Abilify", color: "blue"},
                {x: convertDateToTimestamp("2012-05-01"), y: 3, contents: "Concerta", color: "red"},
                {x: convertDateToTimestamp("2012-05-01"), y: 4, contents: "Lamictal", color: "orange"},
                {x: convertDateToTimestamp("2012-05-01"), y: 5, contents: "Tradazone", color: "black"},
            ]
        }
        var plot = $("."+placeholder+" > .graph > .overview").plot(rawData, options).data("plot");
    }

    function drawDoubleLineGraph(data){
        var placeholder = data.className;
        var rawData = data["frequency"];
        var rawData2 = data["severity"];
        var min = rawData[0][0];
        var max = rawData[rawData.length-1][0];
        $.each(rawData, function(i, data){
            data[0] = convertDateToTimestamp(data[0]);
        });
        $.each(rawData2, function(i, data){
            data[0] = convertDateToTimestamp(data[0]);
        });

        var options ={
          xaxis: {
                min: convertDateToTimestamp(min),
                max: convertDateToTimestamp(max),
                mode: "time",
                tickSize: [1, "year"],
                show:false,
                tickLength: 0,
                axisLabel: 'Month',
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                axisLabelPadding: 5
            },
            yaxis: {
                show:false,
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
                axisLabelPadding: 5
            },
            series: {
                lines: {
                    show: true,
                    fill: false,
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
        var plot = $.plot("."+placeholder, [], options);

        plot.setData( [
            { label: "frequency", data: rawData, color: '#4572A7' },
            { label: "severity", data: rawData2,color: '#792dcc' }
        ]);
        plot.setupGrid();
        plot.draw();
    }

    function convertDateToTimestamp(myDate){
        myDate=myDate.split("-");
        var newDate=myDate[1]+"/"+myDate[2]+"/"+myDate[0];//month/date year
        return new Date(newDate).getTime();
    }

    $(function() {
        initialize();

        var stripe_offset = $(".medication.chart").find(".overview").position().left;
        var stripe_width = ($(".medication.chart").find(".overview").width() - stripe_offset)/3.5;

        $("body").css("background-position" , stripe_offset);
        $("body").css("background-widtg" , stripe_width);

        $(".category-label.expandable").on('click', function(){
            $(this).parents(".chart").toggleClass("EXPANDED");
            $(this).siblings(".graph").find(".overview").toggle();
            $(this).siblings(".graph").find(".detailed").toggle();
            $(this).parents(".chart").toggleClass("lighter")
        });
        // $(".category-label.swappable").on('click', function(){
        //     $(this).siblings(".graph").find(".overview").toggle();
        //     $(this).siblings(".graph").find(".detailed").toggle();
        //     var med =[["1999-05-01", 0], ["2004-05-01", 1], ["2007-05-01", 3], ["2009-05-01", 3], ["2012-05-01", 1]];
        //     //$(".medication > .graph > .overview").html("");
        //     drawNoteGraph("medication", med);
        // });


        /* *********************** */
        /* annotation related code */
        /* *********************** */
        var annotation = {
            'items' : []
        };
        var annotationCreator = {
            'positionSaved' : false,
            'content' : '',
        };


        // Load annotations from local storage if available
        if (typeof(Storage) !== 'undefined'
                && typeof localStorage.annotations !== 'undefined'
                && localStorage.annotations != "") {
            annotation.items = JSON.parse(localStorage.annotations);
        }
        drawAnnotations(annotation.items) // initialize

        $(".annotation-create-overlay")
            .mousemove(function(e){
                //Move the line with the mouse before the first click
                if(annotationCreator.positionSaved === false) {
                    var left = e.pageX;
                    var top = e.pageY;

                    $(".drag-line").css("left", left)
                    $(".anno-create-container").css("top", top - 74)
                }
            })
            .mousedown(function(e){
                annotationCreator.positionSaved = true;
            });

        $("#saveAnnotation").on('click', function(){
            if (annotationCreator.positionSaved) {
                var annotation_id =  Math.random().toString(36).substr(2,5);

                var content = $(".anno-create-container").find("textarea").val()

                if($(".anno-create-container").find("textarea").val() == "") {
                    content = "Missing content";
                }

                var newAnnotation = {
                    'id' : 'anno-' +  annotation_id,
                    'content' : content,
                    'left' : $(".drag-line").css("left"),
                    'top' : $(".anno-create-container").css("top"),
                };

                annotation.items.push(newAnnotation);

                if ( typeof(Storage) !== 'undefined') { // save in local storage
                    localStorage.annotations = JSON.stringify(annotation.items);
                }

                drawAnnotations(annotation.items);
                $(".annotation-create-overlay").hide();
                $(".annotation-create-overlay").find("textarea").val("");
                annotationCreator.positionSaved = false;

            }
            else { //should not happen
                alert("Oops, something is wrong with saving annotations..")
            }
        });

        $("#cancelPosition").on('click', function(){
            annotationCreator.positionSaved = false;
            $(".annotation-create-overlay").hide();
            $(".annotation-create-overlay").find("textarea").val("");
        });

        $("#hideAnnotation").on('click', function(){
            $("#annotations").toggle()
        });
        $("#clearAnnotation").on('click', function(){
            $("#annotations").find("ul").html("")
            annotation.items = [];
            if ( typeof(Storage) !== 'undefined') {
                localStorage.removeItem('annotations');
            }
            $("#annotations").find("ul").html("")
        });

        $('.notch').toggle()

        $("#toggleAnnotationCreator").on('click', function(){
            $(".annotation-create-overlay").toggle();
        });

        $(document).on('click', ".removeAnnotation", function() {
            var self = $(this).parents("li");
            
            for(var i=0; i<annotation.items.length; i++){
                if(self.attr('id') == annotation.items[i].id){
                    annotation.items.splice(i, 1)
                }
            }
            if ( typeof(Storage) !== 'undefined') { // save in local storage
                localStorage.annotations = JSON.stringify(annotation.items);
            }
            self.remove();
        });

        function drawAnnotations(annotations) {
            $("#annotations").find("ul").html("");
            for(var i=0; i<annotations.length; i++) {
                var anno_item = "<li id='"+annotations[i].id+"' style='left: "+annotations[i].left+";'>" +
                                    "<p style='top: "+annotations[i].top+";'>" +
                                        annotations[i].content +
                                        "<a class='removeAnnotation'><i class='fa fa-times'></i></a>" +
                                    "</p>"+
                                "</li>";
                $("#annotations").find("ul").append(anno_item)
            }
        }
    });

    return {
    };
}();
