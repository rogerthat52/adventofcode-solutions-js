function solution1(){
    return runCode(40);
}

function solution2(){
    return runCode(50);
}

function getInput() {
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}

function runCode(count){
    var input = getInput();
    for(var i = 0; i < count; i++){
        input = lookAndSay(input);
        console.log(input);
    }
    return input.length;
}



function lookAndSay(str){
    var numPairs = [];
    // [1, 2], [ 2,1 ], [3, 2]

    for (var i = 0; i < str.length; i++) {
        var quantity = 1; // hold how many of the same
        currentChar = str.charAt(i);
        while(str.charAt(i) != "\n" && currentChar == str.charAt(i+1)){
            quantity++;
            i++;
        }
        if(currentChar != "\n"){
            numPairs.push([quantity,currentChar]);
        }
    }

    return lookAndString(numPairs);
}

function lookAndString(array){
    var returnString = "";

    // [[x,y],[x,y]]
    array.forEach(element => {
        element.forEach(value => {
            returnString += value;
        })
    });

    return returnString;
}