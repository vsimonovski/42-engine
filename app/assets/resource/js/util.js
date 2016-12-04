var sendReq = function() {
    var result = [],
        queryVal = $(".search-wrap__field").val().toLowerCase(),
        start_time = new Date().getTime();

    $.get( "/" + queryVal).done(function(data) {
        $(".results-wrap").empty();
        var dataObj = JSON.parse(data);
        var dataObjArr = dataObj[queryVal];
        if(dataObjArr) {
            var resStr = "result";
            if(dataObjArr.length > 1) {
                resStr += "s";
            }
            $(".results-wrap").append('<p class="time">'+ dataObjArr.length +' ' + resStr + ', <span class=".results-wrap__time"></span></p><hr>');
            for (var i = 0; i < dataObjArr.length; i++ ) {
                $(".results-wrap").append('<p class="results-wrap__single"><i class="fa fa-angle-right" aria-hidden="true"></i><a href="' + dataObjArr[i] + '">' + dataObjArr[i] + "</a></p>");
            }
        }
        else {
            $(".results-wrap").append('<p class="results-wrap__empty">No results found for: "'+ queryVal +'"...</p>');
        }
        var request_time = new Date().getTime() - start_time;
        $(".time").append('<span class="nesto">' + (request_time / 1000).toFixed(2) + ' seconds to complete request </span>');
    });
};


$('.search-wrap__btn').on("click", function(e) {
    sendReq();
});

$('.search-wrap__field').on("keyup", function(e) {
    if(e.which === 13) {
        sendReq();
    }
    else if (e.which === 8) {
        $(".results-wrap").empty();
    }
});