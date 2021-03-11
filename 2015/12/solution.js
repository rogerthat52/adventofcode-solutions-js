function solution1(){
    return runCode();
}

function solution2(){
    return runCode2();
}

function getInput() {
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}

function runCode() {
    var jsonData = JSON.parse(getInput());
    return countObject(jsonData);
}

function countObject(objects){
    var count = 0;
    for(var key in objects) {
        var value = objects[key];
        // check if number
        if(typeof value == "number"){
            count += value;
        }
        // check if array
        if(typeof value == "object"){
            count += countObject(value);
        }
    }
    return count;
}

function runCode2() {
    var jsonData = JSON.parse(getInput());
    return countObject2(jsonData);
}


function countObject2(objects){
    var count = 0;
    if(!Array.isArray(objects)){ // yes its an object
        for(var key in objects) {
            var value = objects[key];
            if(value == "red"){
                return 0;
            }
        }
    }

    for(var key in objects) {
        var value = objects[key];
        // check if number
        if(typeof value == "number"){
            count += value;
        }
        // check if array
        if(typeof value == "object"){
            count += countObject2(value);
        }
    }
    return count;
}