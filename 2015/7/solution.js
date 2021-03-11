const functions = {
    "AND": 0,
    "OR": 1,
    "RSHIFT": 2,
    "LSHIFT": 3,
    "NOT": 4
}

var wires = {}


class wire {
    constructor(name, param1, param2, mod, line){
        this.name = name;
        this.param1 = param1;
        this.param2 = param2;
        this.mod = mod;
        this.line = line;
    }

    toString(){
        this.checkValue();
        return this.value;
    }

    checkValue(from){

        if(this.param1 == undefined){
            console.log("help!");
        }

        if(this.num1 == undefined){
            this.num1 = parseInt(this.param1);
        }

        if(isNaN(this.num1)){ // means its a reference to a wire
            this.num1 = wires[this.param1].checkValue(this.name);
        }

        if(this.param2 != undefined){
            if(this.num2 == undefined){
                this.num2 = parseInt(this.param2);
            }
            if(isNaN(this.num2)){ // means its a reference to a wire
                this.num2 = wires[this.param2].checkValue(this.name);
            }
        }

        if(this.mod == undefined){
            this.value = this.num1;
        } else {                    // get modifier
            switch (this.mod) {
                case functions.AND:
                    this.value = this.num1 & this.num2;
                    break;
                case functions.OR:
                    this.value = this.num1 | this.num2;
                    break;
                case functions.RSHIFT:
                    this.value = this.num1 >> this.num2;
                    break;
                case functions.LSHIFT:
                    this.value = this.num1 << this.num2;
                    break;
                case functions.NOT:
                    this.value = ~this.num1 + 65536;
                    break;
            }
        }
        console.log(`checking ${this.name} from ${from}`);
        console.log(`value of: ${this.name} : ${this.value}`);
        console.log(this.line);
        return this.value;
    }
}

function solution1(){
    runCode();
    return wires["a"].checkValue();
}

function solution2(){
    runCode();
    var tempValue = wires["a"].checkValue();
    runCode();
    wires["b"] = new wire("b", tempValue, undefined, undefined, undefined);
    return wires["a"].checkValue();
}

function getInput() {
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}

function runCode(){
    wires={};
    var input = getInput();

    var lineArray = input.split('\n');
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        const data = line.split(" ");
        if(data.length > 1){

            var num1 = undefined;
            var num2 = undefined;
            var mod = undefined;
            var target = undefined;

            var push = false;

            for(const i in data){
                const seg = data[i];
                if(seg != ''){
                    switch(seg){
                        case "->":
                            push = true;
                            break;
                        case "AND":
                            mod = functions.AND;
                            break;
                        case "OR":
                            mod = functions.OR;
                            break;
                        case "LSHIFT":
                            mod = functions.LSHIFT;
                            break;
                        case "RSHIFT":
                            mod = functions.RSHIFT;
                            break;
                        case "NOT":
                            mod = functions.NOT;
                            break;
                        default:
                            if(push){
                                target = seg;
                            } else {
                                if(num1 != undefined){
                                    num2 = seg;
                                } else {
                                    num1 = seg;
                                }
                            }
                        break;
                    }
                }
            }
            wires[target] = new wire(target, num1, num2, mod, line);
        }
    }
}

