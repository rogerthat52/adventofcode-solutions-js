class Person {
    constructor(name){
        this.name = name;
    }

    relationships = {};
}

var CHANGE = {
    GAIN:1,
    LOSS:-1
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

function runCode(){
    var input = getInput();
    var people = buildPeople(input);
    return checkAllCombos(people);
}

function getNextNumber(people, order, allHappinesses){
    //order = ["Alice"];
    var difference = Object.keys(people).length - order.length;
    if(difference > 0){
        for(var i = 0; i <= Object.keys(people).length-1; i++){
            var potential = Object.keys(people)[i];
            if(order.indexOf(potential) == -1){
                var forward = order.slice(0);
                forward.push(potential);
                var getNumber = getNextNumber(people, forward, allHappinesses);
                if(getNumber != undefined){
                    allHappinesses.push(getNumber); // returns happiness
                }
            }
        }
    } else {
        var happiness = checkHappiness(people, order);
        return happiness
    }
}

function checkAllCombos(people){
    var order = ["Alice"];
    var allHappinesses = [];
    getNextNumber(people, order, allHappinesses);
    return Math.max(...allHappinesses);
}

function checkHappiness(people, order){
    var totalHappiness = 0;
    for(var person in people){
        var personalHappiness = 0;

        var personIndex = order.indexOf(person);
        var indexBefore = personIndex - 1 >= 0 ? personIndex - 1 : order.length-1;
        var indexAfter = personIndex + 1 <= order.length-1 ? personIndex + 1 : 0;
        var person = people[person];
        var personBefore = order[indexBefore];
        var personAfter = order[indexAfter];
        var happinessBefore = person.relationships[personBefore].Change * person.relationships[personBefore].Amount;
        var happinessAfter = person.relationships[personAfter].Change * person.relationships[personAfter].Amount;

        personalHappiness += happinessBefore;
        personalHappiness += happinessAfter;
        totalHappiness+= personalHappiness;
    }
    return totalHappiness;
}

function buildPeople(input){
    people = {};
    lineArray = input.split("\n");
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        if(line.length > 1){
            var data = line.split(" ");

            var Name = data[0];
            var Change = (data[2] == "gain" ? CHANGE.GAIN : CHANGE.LOSS );
            var Amount = parseInt(data[3]);
            var Other = data[10].replace(".","");

            if(people[Name] == undefined){
                people[Name] = new Person(Name);
            }
            if(people[Other] == undefined){
                people[Other] = new Person(Other);
            }

            people[Name].relationships[Other] = {Change, Amount, Other:people[Other]};
        }
    }
    return people;
}


function runCode2(){
    var input = getInput();
    var people = buildPeople2(input);
    return checkAllCombos(people);
}

function buildPeople2(input){
    people = {};
    lineArray = input.split("\n");
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        if(line.length > 1){
            var data = line.split(" ");

            var Name = data[0];
            var Change = (data[2] == "gain" ? CHANGE.GAIN : CHANGE.LOSS );
            var Amount = parseInt(data[3]);
            var Other = data[10].replace(".","");

            if(people[Name] == undefined){
                people[Name] = new Person(Name);
            }
            if(people[Other] == undefined){
                people[Other] = new Person(Other);
            }
            if(people["Me"] == undefined){
                people["Me"] = new Person("Me");
            }

            people[Name].relationships[Other] = {Change, Amount, Other:people[Other]};
            people[Name].relationships["Me"] = {Change:1, Amount:0, Other:people["Me"]};
            people["Me"].relationships[Name] = {Change:1, Amount:0, Other:people[Name]};

        }
    }
    return people;
}