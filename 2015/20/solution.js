var knownFactors = [];

const placeholder = {
    use: false,
    value:`150`
}

function getInput(){
    if(placeholder.use){
        return placeholder.value;
    }
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}

function runCode(){
    const targetNumber = parseInt(getInput());
    var currentHouse = 0;
    var currentValue = 0;
    do {
        currentHouse++;
        currentValue = calculatePresents(currentHouse);
    } while(currentValue < targetNumber)

    return currentHouse;
}

function runCode2(){
    const targetNumber = parseInt(getInput());
    var currentHouse = 0;
    var currentValue = 0;
    do {
        currentHouse++;
        currentValue = calculatePresents2(currentHouse);
    } while(currentValue < targetNumber)

    return currentHouse;
}

function calculatePresents(number){
    var factors = getFactors(number);
    return calculatePresentCount(factors);
}

function getFactors(number){
    var factors = new Set([]);
    var root = Math.floor(Math.sqrt(number));

    for(var i = root; i > 0; i--){
        if(number % i == 0){
            factors.add(i);
            factors.add(number/i);
        }
    }

    return factors;
}

function calculatePresentCount(factors){
    var presentsCount = 0;
    for(var factor of factors){
        presentsCount += factor * 10;
    }
    return presentsCount;
}

function calculatePresents2(number){
    var factors = getFactors(number);
    return calculatePresentCount2(number, factors);
}

function calculatePresentCount2(number, factors){
    var presentsCount = 0;
    for(var factor of factors){
        if(factor * 50 > number){
            presentsCount += factor * 11;
        }
    }
    return presentsCount;
}