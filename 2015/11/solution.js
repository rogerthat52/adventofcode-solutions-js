var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

function solution1(){
    return runCode1();
}

function solution2(){
    return runCode2();
}

function getInput() {
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}


function runCode1(){
    var input = getInput();
    do{
        input = incPass(input);
    } while (!checkPass(input));
    return input;
}

function runCode2(){
    var input = getInput();
    do{
        input = incPass(input);
    } while (!checkPass(input));
    do{
        input = incPass(input);
    } while (!checkPass(input));
    return input;
}

function incPass(input){
    var digitsOver = 2;
    var lastDigit = input.length - digitsOver;

    input = incAtDigit(input, lastDigit);

    return input;
}

function incAtDigit(input, digitIndex){
    var index = alphabet.indexOf(input.charAt(digitIndex));
    index++;

    if(index == 26){ // handle prior letters
        input = incAtDigit(input, digitIndex-1);
        index = 0;
    }

    input = input.substring(0, digitIndex) + alphabet[index] + input.substring(digitIndex + 1)

    return input
}

function checkPass(input){

    return threeStraight(input) * missingLetters(input) * differentPair(input);
}

function threeStraight(input){
    for (var i = 0; i < input.length-2; i++) {
        var currentChar = input.charAt(i);
        var startIndex = alphabet.indexOf(currentChar);
        if(alphabet.indexOf(input.charAt(i+1)) == startIndex+1 && alphabet.indexOf(input.charAt(i+2)) == startIndex+2){
            return true;
        }
    }

    return false;
}

function missingLetters(input){
    var badLetters = ['i','o','l'];
    for (var i = 0; i < input.length-2; i++) {
        var currentChar = input.charAt(i);
        var location = badLetters.indexOf(currentChar);
        if(location != -1){
            return false;
        }
    }

    return true;
}

function differentPair(input){
    var firstPair;

    for (var i = 0; i < input.length-1; i++) {
        var currentChar = input.charAt(i);
        if(currentChar == input.charAt(i+1)){ // we have a pair
            if(firstPair == undefined){
                firstPair = currentChar;
            } else { // if defined
                if(firstPair == currentChar){
                    // do nothing
                } else {
                    return true;
                }
            }
        }
    }

    return false;
}