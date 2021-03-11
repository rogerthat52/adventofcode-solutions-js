const placeholder = {
    use: false,
    value:`e => H
e => O
H => HO
H => OH
O => HH

HOHOHO`
}

class Transformation {
    constructor(input, output){
        this.input = input;
        this.output = output;
    }
}

class ChemicalDatabase {
    constructor(){
        this.data = {};
        this.uniqueMolecules = [];
    }

    add(trans){ // add transformation to data
        if(!this.transformationExists(trans.input)){
            this.data[trans.input] = [];
        }

        this.data[trans.input].push(trans);
    }

    transformationExists(component){
        if(this.data[component] != undefined){
            return true;
        }
        return false;
    }

    getUniqueMolecules(){
        return this.uniqueMolecules;
    }

    getTransformation(component){
        return this.data[component];
    }

    getTransformationsByResult(component){
        var validTransformations = [];
        for(var index in this.data){
            var transformationSet = this.data[index];
            transformationSet.forEach(transformation => {
                if(transformation.output.startsWith(component)){
                    validTransformations.push(transformation);
                }
            });
        };
        return validTransformations;
    }

    addUniqueMolecule(molecule){
        if(this.uniqueMolecules.indexOf(molecule) == -1){
            this.uniqueMolecules.push(molecule);
        }
    }

    getComponents(molecule){
        var components = [];

        for(var i = 0; i < molecule.length; i++){
            var component = molecule.charAt(i); // single character check
            if(this.transformationExists(component)){
                components.push({component, i});
            }
            if(i+1 != molecule.length){ // double character check
                component = component + molecule.charAt(i+1);
                if(this.transformationExists(component)){
                    components.push({component, i});
                }
            }
        }

        return components;
    }

    reverseProcessReaction(molecule, index, component){
        const transformationSet = this.getTransformationsByResult(component);

        for(var i = 0; i < transformationSet.length; i++){
            const currentTransformation = transformationSet[i];
            const transLength = currentTransformation.output.length;
            const checkMolecule = molecule.substring(index, index+transLength);
            if(currentTransformation.output == checkMolecule){
                var newMolecule = molecule.substring(0, index) + currentTransformation.input + molecule.substring(index+transLength);
                this.addUniqueMolecule(newMolecule);
            }
        }
    }

    processReaction(molecule, index, component){
        var transformationSet = this.getTransformation(component);
        for(var i = 0; i < transformationSet.length; i++){
            var newMolecule = molecule.substring(0, index) + transformationSet[i].output + molecule.substring(index+component.length);
            this.addUniqueMolecule(newMolecule);
        }
    }

    reverseProcessMolecule(molecule, mutations){
        var possibleTransformations = [];
        console.log(mutations)
        for (const index in this.data) {
            var transformationSet = this.data[index];
            transformationSet.forEach(transformation => {
                var thisIndex = molecule.indexOf(transformation.output)
                if(thisIndex != -1){
                    possibleTransformations.push({index: thisIndex, transform: transformation});
                }
            })
        }
        possibleTransformations.sort((a, b) => b.transform.output.length - a.transform.output.length);

        for(var transformation of possibleTransformations){
            var newMolecule = molecule.substring(0, transformation.index) + transformation.transform.input + molecule.substring(transformation.index+transformation.transform.output.length);
            console.log("--------");
            console.log(transformation);
            console.log(molecule);
            console.log(newMolecule);
            return this.reverseProcessMolecule(newMolecule, mutations + 1);
        }

        if(possibleTransformations.length == 0){
            if(molecule = 'e'){
                return mutations;
            } else {
                return 1000;
            }
        }
    }

    processMolecule(molecule){
        var components = this.getComponents(molecule);
        components.forEach(element => {
            var component = element.component;
            var i = element.i;
            this.processReaction(molecule, i, component);
        });
    }
}



function getInput(){
    if(placeholder.use){
        return placeholder.value;
    }
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}

function runCode(){
    const input = getInput();
    var data = buildData(input);
    var chemData = data[0];
    var molecule = data[1];
    chemData.processMolecule(molecule);
    return chemData.getUniqueMolecules().length;
}

function runCode2(){
    const input = getInput();
    var data = buildData(input);
    var chemData = data[0];
    var molecule = data[1];
    var targetMolecule = "e";
    
    var mutations = chemData.reverseProcessMolecule(molecule, 0);
    return mutations;
}



function buildData(input){
    var chemData = new ChemicalDatabase();
    var molecule = "";
    
    lineArray = input.split("\n");
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        if(line.length != "\n"){
            var data = line.split(" ");

            if(data[1] == "=>"){
                var Input = data[0];
                var Output = data[2];
                var tempTransf = new Transformation(Input, Output);
                chemData.add(tempTransf);
            } else {
                molecule = data[0];
            }
        }
    }

    return [chemData, molecule];
}

function incrementArray(array, limit){
    
    var lastIndex = array.length - 1;

    array = incrementAtIndex(array, lastIndex, limit);

    return array;
}

function incrementAtIndex(array, index, limit){
    var value = array[index];
    value++;

    if(value > limit){ // handle overflow
        array = incrementAtIndex(array, index-1, limit);
        value = 0;
    }

    array[index] = value;

    return array;
}