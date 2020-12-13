$(document).ready(function () {

    var firstvalue = 0;
    var secondvalue = 0;
    var calculation = 0;
    

    $("input[name^='dg']").click(function (e) {
        e.preventDefault();
        var clicked_button = e.originalEvent.explicitOriginalTarget.value;
        console.log(clicked_button);
        $('#inputbox').val($('#inputbox').val() + clicked_button);
    });


    $("input[name^='cal_']").click(function(e) {
        e.preventDefault();
        firstvalue = $('#inputbox').val();
        calculation = e.originalEvent.explicitOriginalTarget.value;
        console.log(calculation);

        $('#inputbox').val($('#inputbox').val() + calculation);

    });



    $("input[name^='del']").click(function (e) {
        e.preventDefault();
        $('#inputbox').val('');
        $('#outputbox').val('');
         firstvalue = 0;
         secondvalue = 0;
         calculation = 0;

    });

    $("input[name = 'result2']").click(function() {
        var val = $("#inputbox").val();
        secondvalue = val.substr(val.indexOf(calculation) + 1);
        $('#outputbox').val(firstvalue + secondvalue + calculation);
    });


    $("input[name = 'result']").click(function () {

       

        var val = $("#inputbox").val();
        var value2 = val.substr(val.indexOf(calculation) + 1);

        var value1 = firstvalue;
        
        var arg = "value1=" + value1 + "&value2=" + value2;

        var id = calculation;

        //var urlString = "http://localhost:57633/api/math/";
        var urlString = "/api/math/";

        switch (id) {
        case '+':
            urlString = urlString + "Add/?" + arg;
            break;
        case '-':
            urlString = urlString + "Substract/?" + arg;
            break;
        case 'X':
            urlString = urlString + "Multiply/?" + arg;
            break;
        case '/':
            urlString = urlString + "Divide/?" + arg;
            break;
        default:
            urlString = urlString + "hello";

        }

        $.ajax({
            url: urlString,
            type: "GET",
            dataType: 'json',
            success: function (result) {
                $('#outputbox').val(result);

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                $('#outputbox').val(err.Message);
            }
        });
    });

});