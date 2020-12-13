var  num1 = '';
var num2 = '';
var operator = '';
var total = '';

$(document).ready(function () {
    $('input').on('click', function (e) {
        var btn = e.target.defaultValue;
        if (btn >= '0' && btn <= '9') {
            handleNumber(btn);
        } else {
            handleOperator(btn);
        }
    });
});

function handleNumber(num) {
    if (operator ==='') {
        num1 = num1+num;
    } else {
        num2 = num;
    }
    displayButton(num1);
}

function handleOperator(oper) {
    if (operator === '') {
        operator = oper;
    } else {
        handleTotal();
        operator = oper;
    }
}

function handleTotal() {
    switch (operator) {
    case '+':
        total = +num1 + +num2;
        displayResult(total);
        break;
    case '-':
        total = +num1 - +num2;
        displayResult(total);
        break;
    case '/':
        total = +num1 / +num2;
        displayResult(total);
        break;
    case 'X':
        total = +num1 * +num2;
        displayResult(total);
        break;
    }
    updateVariables();
}

function displayResult(btn) {
   
    $('#outputbox').val(btn);
}

function displayButton(btn) {

    $('#inputbox').val(btn);
}

function updateVariables() {
    num1 = total;
    num2 = '';
}

$("input[name^='del']").click(function (e) {
    e.preventDefault();
    $('#inputbox').val('');
    $('#outputbox').val('');
    num1 = '';
    num2 = '';
    operator = '';

});