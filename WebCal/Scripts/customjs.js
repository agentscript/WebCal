$(document).ready(function () {

    var firstvalue = 0;
    var secondvalue = 0;
    var calculation = 0;
    var total = 0;
    var notlastsign = 1;
    

    //Manual Inputs
    $('#inputbox').keyup(function(e) {
        
        if (operator == 0) {
            firstvalue = $('#inputbox').val;
        }
    });





    //clicker Events 
    $("input[name^='dg']").click(function (e) {
        e.preventDefault();
        var clicked_button = e.originalEvent.explicitOriginalTarget.value;
        UpdateValue(clicked_button);
        notlastsign = 0;
    });

    $("input[name='bs']").click(function (e) {
        e.preventDefault();
        var clicked_button = e.originalEvent.explicitOriginalTarget.value;
        console.log(clicked_button);
        $('#inputbox').val($('#inputbox').val().slice(0, -1));
        if (calculation == 0) {
            firstvalue = firstvalue.slice(0, -1);
            
        } else if (calculation != 0 && secondvalue == 0) {
            calculation = 0;
            notlastsign = 0;
                    } else {
            secondvalue = secondvalue.slice(0, -1);
            if (secondvalue == 0) {
                notlastsign = 1;
            }

        }

      


    });

    $("input[name='sqrt']").click(function(e) {
        if (notlastsign == 0) {

            if (calculation == 0) {
                calculation = 'sqrt';
                do_Calc();
                calculation = e.originalEvent.explicitOriginalTarget.name;
                update_InputBox(calculation);
               
            } else {
                
                do_Calc();
                firstvalue = total;
                secondvalue = 0;
                calculation = 'sqrt';
                do_Calc();
                calculation = e.originalEvent.explicitOriginalTarget.name;
                update_InputBox(calculation);
            }

        }

    });

    $("input[name^='cal_']").click(function (e) {
        if (notlastsign==0) {
            if (calculation == '0') {
                e.preventDefault();
                calculation = e.originalEvent.explicitOriginalTarget.value;
                notlastsign = 1;
                //console.log(calculation);
                update_InputBox(calculation);
            } else {
                notlastsign = 1;
                do_Calc();
                firstvalue = total;
                secondvalue = 0;
                calculation = e.originalEvent.explicitOriginalTarget.value;
                update_InputBox(calculation);

            }
        }


    });

    $("input[name='deci']").click(function (e) {
        notlastsign = 1;
        if (calculation == 0) {
            if (firstvalue.indexOf(".") <= 0) {
                updateFirst(".");
                update_InputBox(".");
            }

        } else {
            if (secondvalue.indexOf(".") <= 0) {
                updateSec(".");
                update_InputBox(".");
            }
           
        }
        

    });

    $("input[name^='del']").click(function (e) {
        e.preventDefault();
        $('#inputbox').val('');
        $('#outputbox').val('');
         firstvalue = 0;
         secondvalue = 0;
        calculation = 0;
        total = 0;
        result = 0;
        notlastsign = 0;

    });


    $("input[name = 'result']").click(function () {
        do_Calc();
    });


    function UpdateValue(value)
    {
        if (calculation == 0) {
            updateFirst(value);
        } else {
            updateSec(value);
        }
        update_InputBox(value);
    }


    function updateFirst(val1) {
        firstvalue = firstvalue + val1;
    }

    function updateSec(val2) {
        secondvalue = secondvalue + val2;
    }

    function update_InputBox(disp) {
        $('#inputbox').val($('#inputbox').val() + disp);
    }

    function do_Calc() {

        var value1 = firstvalue;
        var value2 = secondvalue;
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

        case '%':
            urlString = urlString + "Percentage/?" + arg;
                break;
        case 'sqrt':
            urlString = urlString + "SqRoot/?" + arg;
            break;


        default:
            urlString = urlString + "hello";

        }

        $.ajax({
            url: urlString,
            type: "GET",
            async: false,
            dataType: 'json',
            success: function (result) {
                total = result;
                $('#outputbox').val(result);

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                $('#outputbox').val(err.Message);
            }
        });
    }


});