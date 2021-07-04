//---------------------------------- Change Themes --------------------------//

function themeChange() {
    var elements = document.getElementsByName('toggle');

    Array.from(elements).forEach( element => {
        if(element.checked) {
            changeColours(element.value);
            return;
        }
    })
}

function changeColours(value) {

    switch (value) {
        case "1":
            document.documentElement.style.setProperty('--bg-color', 'hsl(222, 26%, 31%)');
            document.documentElement.style.setProperty('--text-color', 'hsl(0, 0%, 100%)');

            document.documentElement.style.setProperty('--screen-color', 'hsl(224, 36%, 15%)');
            document.documentElement.style.setProperty('--numpad-bg-color', 'hsl(223, 31%, 20%)');

            document.documentElement.style.setProperty('--gen-button-color', 'hsl(30, 25%, 89%)');
            document.documentElement.style.setProperty('--gen-button-shadow-color', 'hsl(28, 16%, 65%)');
            document.documentElement.style.setProperty('--gen-button-text-color', 'hsl(221, 14%, 31%)');

            document.documentElement.style.setProperty('--dr-button-color', 'hsl(225, 21%, 49%)');
            document.documentElement.style.setProperty('--dr-button-shadow-color', 'hsl(224, 28%, 35%)');
            document.documentElement.style.setProperty('--dr-button-text-color', 'hsl(0, 0%, 100%)');

            document.documentElement.style.setProperty('--equal-button-color', 'hsl(6, 63%, 50%)');
            document.documentElement.style.setProperty('--equal-button-shadow-color', 'hsl(6, 70%, 34%)');
            document.documentElement.style.setProperty('--equal-button-text-color', 'hsl(0, 0%, 100%)');
            
            break;
        
        case "2":
            document.documentElement.style.setProperty('--bg-color', 'hsl(0, 0%, 90%)');
            document.documentElement.style.setProperty('--text-color', 'hsl(60, 10%, 19%)');

            document.documentElement.style.setProperty('--screen-color', 'hsl(0, 0%, 93%)');
            document.documentElement.style.setProperty('--numpad-bg-color', 'hsl(0, 5%, 81%)');

            document.documentElement.style.setProperty('--gen-button-color', 'hsl(45, 7%, 89%)');
            document.documentElement.style.setProperty('--gen-button-shadow-color', 'hsl(35, 11%, 61%)');
            document.documentElement.style.setProperty('--gen-button-text-color', 'hsl(60, 10%, 19%)');

            document.documentElement.style.setProperty('--dr-button-color', 'hsl(185, 42%, 37%)');
            document.documentElement.style.setProperty('--dr-button-shadow-color', 'hsl(185, 58%, 25%)');
            document.documentElement.style.setProperty('--dr-button-text-color', 'hsl(0, 0%, 100%)');

            document.documentElement.style.setProperty('--equal-button-color', 'hsl(25, 98%, 40%)');
            document.documentElement.style.setProperty('--equal-button-shadow-color', 'hsl(25, 99%, 27%)');
            document.documentElement.style.setProperty('--equal-button-text-color', 'hsl(0, 0%, 100%)');
            
            break;
        
        case "3":
            document.documentElement.style.setProperty('--bg-color', 'hsl(268, 75%, 9%)');
            document.documentElement.style.setProperty('--text-color', 'hsl(52, 100%, 62%)');

            document.documentElement.style.setProperty('--screen-color', 'hsl(268, 71%, 12%)');
            document.documentElement.style.setProperty('--numpad-bg-color', 'hsl(268, 71%, 12%)');

            document.documentElement.style.setProperty('--gen-button-color', 'hsl(268, 47%, 21%)');
            document.documentElement.style.setProperty('--gen-button-shadow-color', 'hsl(290, 70%, 36%)');
            document.documentElement.style.setProperty('--gen-button-text-color', 'hsl(52, 100%, 62%)');

            document.documentElement.style.setProperty('--dr-button-color', 'hsl(281, 89%, 26%)');
            document.documentElement.style.setProperty('--dr-button-shadow-color', 'hsl(285, 91%, 52%)');
            document.documentElement.style.setProperty('--dr-button-text-color', 'hsl(0, 0%, 100%)');

            document.documentElement.style.setProperty('--equal-button-color', 'hsl(176, 100%, 44%)');
            document.documentElement.style.setProperty('--equal-button-shadow-color', 'hsl(177, 92%, 70%)');
            document.documentElement.style.setProperty('--equal-button-text-color', 'hsl(198, 20%, 13%)');

            break;
    
        default:
            break;
    }

}


//----------------------- Calculator Functions --------------------------------------------------------//

var numString = ""; //holds entered number as string until entered
var buffer = []; //buffer of float's to be operated on
var operations = []; //buffer of operations to be done between each float in buffer

//write number to screen
function writeToScreen(text) {
    document.getElementById('number').innerText = text;
}

//builds up string to be parsed as a number
function addToNumber(value) {
    numString += value;
    writeToScreen(numString);
}

//removes from string to be parsed as a number
function removeFromNumber() {
    numString = numString.slice(0, -1);
    writeToScreen(numString);
}

//reset -> clear everything
function reset() {
    numString = "";
    buffer = [];
    operations = [];
    writeToScreen("0");
}

//add operation to operations array
function setOperation(value) {
    operations.push(value);
    sendToBuffer(numString);
}

//parse string to number and add to buffer
function sendToBuffer() {
    buffer.push(parseFloat(numString));
    numString = "";
    writeToScreen(numString);
}

//executes sequence of operations when = is pressed
function doOperations() {
    buffer.push(parseFloat(numString));

    answer = buffer[0];

    if(buffer.length < 1) {
        return answer;
    }

    for (let i = 1; i < buffer.length; i++) {
        
        var first = answer;
        var second = buffer[i];
        var operation = operations[i-1];

        answer = operate(answer, second, operation);
    }

    if(answer.toString().length > 13) {
        answer = parseFloat(answer.toFixed(5));
    }

    writeToScreen(answer);

    numString = answer.toString();
    buffer = [];
    operations = [];
}

//performs individual operations -> takes in 2 numbers and an operation string "+" "-" "x" "/"
function operate(first, second, operation) {

    var answer = 0;

    switch (operation) {
        case "+":
            answer = first + second;
            break;
        
        case "-":
            answer = first - second;
            break;

        case "x":
            answer = first * second;
            break;

        case "/":
            answer = first/second;
            break;
    
        default:
            break;
    }

    return answer;
}