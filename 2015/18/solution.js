const placeholder = {
    use: false,
    value:`##.#.#
...##.
#....#
..#...
#.#..#
####.#`
}

class Map {
    constructor(data){
        this.data = data;
    }

    isLit(x, y){
        var light = this.getCoordinate(x,y);
        if(light == "#"){
            return true;
        } else {
            return false;
        }
    }

    getCoordinate(x, y){
        if(this.data[y] == undefined){
            return ".";
        }
        if(this.data[y][x] == undefined){
            return ".";
        }
        return this.data[y][x];
    }

    processCoordinate(x, y){
        var currentState = this.isLit(x, y);
        var totalLitNeighbors = 0;

        for(var my = y-1; my < y+2; my++){
            for(var mx = x-1; mx < x+2; mx++){
                if(mx == x && my == y){} else {
                    totalLitNeighbors += this.isLit(mx, my);
                }
            }
        }
        
        if(currentState){
            if(totalLitNeighbors == 2 || totalLitNeighbors == 3){
                return true;
            }
        } else {
            if(totalLitNeighbors == 3){
                return true;
            }
        }
        return false;
    }

    process(){
        var data = [];
        for(var y = 0; y < this.data.length; y++){
            var row = [];
            for(var x = 0; x < this.data[0].length; x++){
                ////// get data at coordinate
                var lightValue = this.processCoordinate(x,y);

                if(lightValue){ lightValue = "#"} else {
                                lightValue = ".";
                }

                // add to map
                row.push(lightValue);
            }
            data.push(row);
        }
        this.data = data;
    }

    cornerStuck(){
        var width = this.data[0].length-1;
        var height = this.data.length-1;

        this.data[0][0] = "#";
        this.data[width][0] = "#";
        this.data[0][height] = "#";
        this.data[width][height] = "#";
    }

    getNumOfLights(){
        var lightCount = 0;
        for(var y = 0; y < this.data.length; y++){
            for(var x = 0; x < this.data[0].length; x++){
                if(this.data[x][y] == "#"){
                    lightCount++;
                }
            }
        }
        return lightCount;
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
    var map = buildMap(input);
    const loopTime = 100;
    for(var i = 0; i < loopTime; i++){
        map.process();
    }
    return map.getNumOfLights();
}

function runCode2(){
    const input = getInput();
    var map = buildMap(input);
    map.cornerStuck();
    const loopTime = 100;
    for(var i = 0; i < loopTime; i++){
        map.process();
        map.cornerStuck();
    }
    return map.getNumOfLights();
}

function buildMap(input){
    var map = [];
    
    lineArray = input.split("\n");
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        if(line.length != "\n"){
            var row = [];
            for(var i = 0; i < line.length; i++){
                const char = line.charAt(i);
                row[i] = char;
            }
            map.push(row);
        }
    }

    map = new Map(map);
    return map;
}