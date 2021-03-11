var coordinates = {};

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
    coordinates = {};
    const input = getInput();

    var santa = {x:0, y:0}

    // do deliveries
    deliverPresent(0,0);

    for(var i = 0;i< input.length;i++){ // check each character
        var char = input.charAt(i); // get char
        var x=0;
        var y=0;
        switch(char){
        case "^":
            x=1;
            break;
        case "v":
            x=-1;
            break;
        case "<":
            y=-1;
            break;
        case ">":
            y=1;
            break;
        }
        santa.x += x;
        santa.y += y;
        y = santa.y;
        x = santa.x;
        deliverPresent(x,y); // deliver
    }

    // count additional deliveries
    var extras = 0;
    for(const coordinate in coordinates){
        extras++;
    }
    return extras;
}

function runCode2(){
    coordinates = {};
    const input = getInput();

    var santa = {x:0, y:0}
    var robosanta = {x:0, y:0}

    // do deliveries
    deliverPresent(0,0);

    for(var i = 0;i< input.length;i++){ // check each character
        var char = input.charAt(i); // get char
        var x=0;
        var y=0;
        switch(char){
        case "^":
            x=1;
            break;
        case "v":
            x=-1;
            break;
        case "<":
            y=-1;
            break;
        case ">":
            y=1;
            break;
        }
        if(false){
            i % 2 
            i = 1 // return 1
            i = 2 // return 0
        }
        switch (i % 2) {
            case 0:
                santa.x += x;
                santa.y += y;
                y = santa.y;
                x = santa.x;
                break;
            case 1:
                robosanta.x += x;
                robosanta.y += y;
                y = robosanta.y;
                x = robosanta.x;
                break;
        }

        deliverPresent(x,y); // deliver
    }

    // count additional deliveries
    var extras = 0;
    for(const coordinate in coordinates){
        extras++;
    }
    return extras;
}

function deliverPresent(x, y){
    var keyName = `x${x}y${y}`;
    console.log(keyName);
    if(keyName in coordinates){
        coordinates[keyName]++;
    } else {
        coordinates[keyName] = 1;
    }
}