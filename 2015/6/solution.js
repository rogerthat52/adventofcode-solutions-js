var lights;
const states = {
    ON: 0,
    OFF: 1,
    TOGGLE: 2
}

function solution1(){
    return runCode();
}

function solution2(){
    return runCode2();
}

function getInput() {
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}
function runCode2(){
    var input = getInput();
    var lineArray = input.split('\n');

    lights = new Array(1000);
    for (let x=0; x< 1000; x++) {
        lights[x] = new Array(1000);
        for (let y = 0; y < 1000; y++) {
            lights[x][y] = 0;
        }
    }

    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        //var line = "toggle 499,499 through 500,500"
        console.log(line);
        const data = line.split(" "); 
        // function | coord | through | coord
        if(data.length > 1){
            var i = 0;

            var alter = -1;
            var coord1;
            var coord2;

            switch(data[i]){                  // get function
                case "turn":
                    i++
                    switch (data[i]) {
                        case "on":
                            alter = states.ON;
                            break;
                        case "off":
                            alter = states.OFF;
                            break;
                    }
                    break;
                case "toggle":
                    alter = states.TOGGLE;
                    break;
            }
            i++;

            coord1 = data[i];
            i++; i++;
            coord2 = data[i];
            changeAllStates2(coord1, coord2, alter);
            //changeAllStates("0,0","2,2",0);

        }
    }

    return count();
}

function changeAllStates2(coord1, coord2, alter){
    coords1 = coord1.split(',');
    coords2 = coord2.split(',');
    for (let x = parseInt(coords1[0]); x <= coords2[0]; x++) {
        for (let y = parseInt(coords1[1]); y <= coords2[1]; y++) {
            changeState2(x, y, alter);
        }
    }
}

function changeState2(x, y, alter){
    switch (alter) {
        case states.ON:
            lights[x][y] += 1;
            break;
        case states.OFF:
            lights[x][y] -= 1;
            if(lights[x][y] < 0){
                lights[x][y] = 0;
            }
            break;
        case states.TOGGLE:
            lights[x][y] += 2;
            break;
    }
}

function count(){
    var lightsOn = 0;
    for (let x=0; x< 1000; x++) {
        for (let y = 0; y < 1000; y++) {
            lightsOn += lights[x][y];
        }
    }
    return lightsOn;
}


function runCode(){
    var input = getInput();
    var lineArray = input.split('\n');

    lights = new Array(1000);
    for (let x=0; x< 1000; x++) {
        lights[x] = new Array(1000);
        for (let y = 0; y < 1000; y++) {
            lights[x][y] = 0;
        }
    }

    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        //var line = "toggle 499,499 through 500,500"
        console.log(line);
        const data = line.split(" "); 
        // function | coord | through | coord
        if(data.length > 1){
            var i = 0;

            var alter = -1;
            var coord1;
            var coord2;

            switch(data[i]){                  // get function
                case "turn":
                    i++
                    switch (data[i]) {
                        case "on":
                            alter = states.ON;
                            break;
                        case "off":
                            alter = states.OFF;
                            break;
                    }
                    break;
                case "toggle":
                    alter = states.TOGGLE;
                    break;
            }
            i++;

            coord1 = data[i];
            i++; i++;
            coord2 = data[i];
            console.log(alter);
            console.log(coord1);
            console.log(coord2);
            changeAllStates(coord1, coord2, alter);
            //changeAllStates("0,0","2,2",0);

        }
    }

    return count();
}

function changeAllStates(coord1, coord2, alter){
    coords1 = coord1.split(',');
    coords2 = coord2.split(',');
    for (let x = parseInt(coords1[0]); x <= coords2[0]; x++) {
        for (let y = parseInt(coords1[1]); y <= coords2[1]; y++) {
            changeState(x, y, alter);
        }
    }
}

function changeState(x, y, alter){
    switch (alter) {
        case states.ON:
            lights[x][y] = 1;
            break;
        case states.OFF:
            lights[x][y] = 0;
            break;
        case states.TOGGLE:
            if(lights[x][y]){
                lights[x][y] = 0;
            } else {
                lights[x][y] = 1;
            }
            break;
    }
}

function count(){
    var lightsOn = 0;
    for (let x=0; x< 1000; x++) {
        for (let y = 0; y < 1000; y++) {
            lightsOn += lights[x][y];
        }
    }
    return lightsOn;
}