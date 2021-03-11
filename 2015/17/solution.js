function getInput(){
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}

function runCode() {
    const input = getInput();
    var storage = buildStorage(input);
    var totalComs = {total: 0};
    combinationCount(storage, 0, 150, totalComs);
    console.log(totalComs.total);
    return totalComs.total;
}

function buildStorage(input){
    var storage = [];
    
    lineArray = input.split("\n");
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        if(line.length != "\n"){
            var data = line.split(" ");

            var Liters = parseInt(data[0]);

            storage.push(Liters);
        }
    }

    return storage;
}

function combinationCount(array, currentCount, desiredCount, totalComs){
    for(var i = 0; i < array.length; i++){
        var loopCount = currentCount;
        loopCount += array[i];
        var arrayCopy = array.slice(0);
        arrayCopy.splice(0, i+1);
        if(loopCount > desiredCount){
            // too big!!
        } else if( loopCount == desiredCount){
            // equal
            totalComs.total += 1;
        } else {
            combinationCount(arrayCopy, loopCount, desiredCount, totalComs);
        }
    }
}


function runCode2(){
    const input = getInput();
    var storage = buildStorage(input);
    var totalComs = {total: 0};
    combinationCount2(storage, 0, 0, 150, totalComs);
    console.log(totalComs.total);
    return totalComs.total;
}

function combinationCount2(array, containersNeeded, currentCount, desiredCount, totalComs){
    for(var i = 0; i < array.length; i++){
        var loopCount = currentCount;
        loopCount += array[i];
        var arrayCopy = array.slice(0);
        arrayCopy.splice(0, i+1);
        if(loopCount > desiredCount){
            // too big!!
        } else if( loopCount == desiredCount){
            // equal
            if(totalComs.containersNeeded > containersNeeded || totalComs.containersNeeded == undefined){
                totalComs.containersNeeded = containersNeeded;
                totalComs.total = 1;
            } else if(totalComs.containersNeeded == containersNeeded) {
                totalComs.total += 1;
            }
        } else {
            combinationCount2(arrayCopy, containersNeeded+1, loopCount, desiredCount, totalComs);
        }
    }
}