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
    var niceCount = 0;

    var input = getInput();
    var lineArray = input.split('\n');
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        if(checkAll1(line)){
            niceCount++;
        }
    }
    return niceCount;
}

function runCode2(){
    var niceCount = 0;

    var input = getInput();
    var lineArray = input.split('\n');
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        if(checkAll2(line)){
            niceCount++;
        }
    }
    return niceCount;
}

function checkAll2(line){
    return checkSepDoubles(line) * checkSandwich(line);

}

function checkSepDoubles(line){
    for(var i = 0;i<line.length-3;i++){
        const char = line.charAt(i);
        const nextChar = line.charAt(i+1);
        const charPair = char + nextChar;

        for(var c = i+2;c < line.length-1; c++){ // check all remaining character pairs
            const char2 = line.charAt(c);
            const nextChar2 = line.charAt(c+1);
            const charPair2 = char2 + nextChar2;

            if(charPair == charPair2){
                return true;
            }
        }
    }

    return false;
}

function checkSandwich(line){
    for(var i = 0; i< line.length-2; i++){
        var char = line.charAt(i);
        var nextChar = line.charAt(i+2);
        if(char == nextChar){
            return true;
        }
    }

    return false;
}

function checkAll1(line){
    return checkVowels(line) * checkTwice(line) * checkStrings(line);

}

function checkVowels(line){
    var vowels = ['a','e','i','o','u'];
    var vowelCount = 0;
    
    for(var i = 0;i< line.length;i++){
        var char = line.charAt(i);
        if(vowels.indexOf(char) != -1){
            vowelCount++;
        }
    }

    if(vowelCount>=3){
        return true;
    }
}

function checkTwice(line){
    for(var i = 0; i< line.length-1; i++){
        var char = line.charAt(i);
        var nextChar = line.charAt(i+1);
        if(char == nextChar){
            return true;
        }
    }

    return false;
}

function checkStrings(line){
    var badStrings = ["ab","cd","pq","xy"];

    for(var i = 0; i< line.length-1; i++){
        var char = line.charAt(i);
        var nextChar = line.charAt(i+1);
        var charPair = char + nextChar;

        if(badStrings.indexOf(charPair) != -1){
            return false;
        }
    }

    return true;
}