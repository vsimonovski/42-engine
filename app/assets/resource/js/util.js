var sendReq = function() {
    var result = [];
    var queryVal = $(".search-field").val();
    $.get( "/" + queryVal).done(function(data) {
        $(".results-wrap").empty();
        for (var i = 0; i < data.length; i++ ) {
            $(".results-wrap").append("<p>" + data[i] + "</p>");
        }
    });
    
};


$('.ghost-btn').on("click", function(e) {
    sendReq();
});

$('.search-field').on("keyup", function(e) {
    if(e.which === 13) {
        sendReq();
    }
    else if (e.which === 8) {
        $(".results-wrap").empty();
    }
});

/*

*/