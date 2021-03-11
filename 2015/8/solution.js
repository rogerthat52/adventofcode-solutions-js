function solution1(){
    return runCode();
}

function solution2(){
    return runCode2()
}

function getInput() {
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}

function runCode(){
    var difference = 0;

    var input = getInput();
    var lineArray = input.split('\n');
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        if(line != ""){
            console.log(line);

            difference += getDifference(line);
        }
    }
    console.log(difference);
    return difference;
}

function getLiteralLength(line){
    return line.length;
}

function getDifference(line){
    return getLiteralLength(line) -  getMemoryLength(line);
}

function getMemoryLength(line){
    line = line.replace(/\\\\/g, "w");
    line = line.replace(/\\\"/g,"w");
    line = line.replace(/\"/g, "");
    var x = "\\x";
    var p = line.indexOf(x);
    while(p != -1){
        line = line.substring(0, p) + line.substring (p + 3);
        p = line.indexOf(x);
    }
    console.log(line);
    return line.length;
}

function runCode2(){
    var difference = 0;
    var input = getInput();
    var lineArray = input.split('\n');
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        if(line != ""){
            difference += expandDifference(line);
        }
    }
    console.log(difference);
    return difference;
}

function expandDifference(line){
    return expandLine(line).length - line.length;
}

function expandLine(line){

    line = line.replace(/\\/g, "\\\\");
    line = line.replace(/\"/g,"\\\"");
    line = '"' + line + '"'


    // var x = "\\x";
    // var p = line.indexOf(x);

    // while(p != -1){
    //     line = line.substring(0, p) + line.substring (p + 3);
    //     p = line.indexOf(x);
    // }
    return line;
}