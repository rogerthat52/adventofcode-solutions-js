class AuntList {
    constructor(){

    }

    auntCollection = [];

    addAunt(aunt) {
        this.auntCollection.push(aunt);
    }

    filterAunts(parameter){
        const data = parameter.split(" ");
        const tempAttribute = data[0].replace(":","");
        const tempAmount = parseInt(data[1]);
        console.log(tempAttribute);
        console.log(tempAmount);
        this.auntCollection = this.auntCollection.filter(aunt => this.filterFunction(aunt, tempAttribute, tempAmount));
    }

    filterFunction(aunt, attribute, amount){
        const expectedAmount = aunt[attribute];
        var conditionalCheck;
        if(expectedAmount == amount || expectedAmount == 0 || expectedAmount == undefined){
            return true;
        }
    }

    filterAunts2(parameter){
        const data = parameter.split(" ");
        const tempAttribute = data[0].replace(":","");
        const tempAmount = parseInt(data[1]);
        console.log(tempAttribute);
        console.log(tempAmount);
        this.auntCollection = this.auntCollection.filter(aunt => this.filterFunction2(aunt, tempAttribute, tempAmount));
    }

    filterFunction2(aunt, attribute, amount){
        const expectedAmount = aunt[attribute];
        var conditionalCheck;

        switch(attribute){
            case "cats":
                conditionalCheck = expectedAmount > amount;
                break;            
            case "trees":
                conditionalCheck = expectedAmount > amount;
                break;            
            case "pomeranians":
                conditionalCheck = expectedAmount < amount;
                break;            
            case "goldfish":
                conditionalCheck = expectedAmount < amount;
                break;
            default:
                var conditionalCheck = expectedAmount == amount || expectedAmount == 0;
                break;
        }

        if(conditionalCheck|| expectedAmount == undefined){
            return true;
        }
    }

    getLength(){
        return this.auntCollection.length;
    }

    nextAunt(){
        if(this.auntCollection[0] != undefined){
            return this.auntCollection[0];
        }
    }
}

class Aunt {
    constructor(name, number){
        this.name = name;
        this.number = number;
    }

    getName(){
        return this.name;
    }

    getNumber(){
        return this.number;
    }
}

var adventofcode = {
    year: 2015,
    day: 9
}

function getInput(){
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}

function runCode(){
    const input = getInput();
    var auntList = buildAunts(input);

    const otherInput = runMFCSAM();
    paramArray = otherInput.split("\n");
    for(const lineNum in paramArray){
        const line = paramArray[lineNum];
        if(line.length > 1){
            auntList.filterAunts(line);
        }
    }

    console.log(auntList.getLength());
    console.log(auntList);
    if(auntList.getLength() == 1){
        return auntList.nextAunt().getNumber();
    } else {
        alert("aunt filter broke");
    }
}


function runCode2(){
    const input = getInput();
    var auntList = buildAunts(input);

    const otherInput = runMFCSAM();
    paramArray = otherInput.split("\n");
    for(const lineNum in paramArray){
        const line = paramArray[lineNum];
        if(line.length > 1){
            auntList.filterAunts2(line);
        }
    }

    console.log(auntList.getLength());
    console.log(auntList);
    if(auntList.getLength() == 1){
        return auntList.nextAunt().getNumber();
    } else {
        alert("aunt filter broke");
    }
}

function runMFCSAM() {
    return `children: 3
cats: 7
samoyeds: 2
pomeranians: 3
akitas: 0
vizslas: 0
goldfish: 5
trees: 3
cars: 2
perfumes: 1`;
}


function buildAunts(input){
    var auntList = new AuntList();

    lineArray = input.split("\n");
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        if(line.length > 1){
            var data = line.split(" ");

            var Name = data[0];
            var Number = parseInt(data[1].replace(":",""));
            tempAunt = new Aunt(Name, Number);

            for(var i = 1; i < 4; i++){
                const tempAttribute = data[i*2].replace(":","");
                const tempAmount = data[i*2+1].replace(",","");
                tempAunt[tempAttribute] = tempAmount;
            }

            auntList.addAunt(tempAunt);
        }
    }

    return auntList;
}
