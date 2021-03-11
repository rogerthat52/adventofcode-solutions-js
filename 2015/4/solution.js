key = "bgvyzdsv";

function solution1(){
    return runCode(5);
}

function solution2(){
    return runCode(6);
}

function getInput() {
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}

function runCode(digits){
    var currentNumber = 0;
    while(!checkNumber(key+currentNumber, digits)){
        currentNumber++;
    }
    return currentNumber;
}

function checkNumber(input, digits){
    var hash = CryptoJS.MD5(input)

    if(checkZeroes(hash, digits)){
        return true;
    } else {
        return false;
    }
}

function checkZeroes(hash, digits){
    for (let index = 0; index < digits; index++) {
        var char = hash.toString().charAt(index);
        if(char != '0'){
            return false;
        }
    }
    return true;
}




