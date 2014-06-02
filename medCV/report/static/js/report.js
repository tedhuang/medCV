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
    }


    $(function() {
        initialize();
    });

    return {
    };
}();
