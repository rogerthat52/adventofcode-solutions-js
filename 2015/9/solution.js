var locations = {

}

class Location  {
    constructor(name){
        this.name = name;
    }

    nodes = {};

    findShortestDistance(checked){
        var distances = {};
        if(checked == undefined){
            checked = [this.name];
        }
        for(var location in this.nodes){
            if(checked.indexOf(this.nodes[location].Location.name) == -1){
                var tempChecked = checked.slice(0);
                tempChecked.push(this.nodes[location].Location.name);
                distances[location] = this.nodes[location].Location.findShortestDistance(tempChecked);
            }
        }
        
        if(Object.keys(distances).length == 0){
            return 0;
        }

        var shortestDistance;
        var shortestLocation;

        for(var location in distances){
            if(shortestDistance == undefined){
                shortestDistance = distances[location];
                shortestLocation = location;
            }
            
            if(distances[location] < shortestDistance){
                shortestDistance = distances[location];
                shortestLocation = location;
            }
        }
        return this.nodes[shortestLocation].distance + shortestDistance;
    }
    
    
    findLongestDistance(checked){
        var distances = {};
        if(checked == undefined){
            checked = [this.name];
        }
        for(var location in this.nodes){
            if(checked.indexOf(this.nodes[location].Location.name) == -1){
                var tempChecked = checked.slice(0);
                tempChecked.push(this.nodes[location].Location.name);
                distances[location] = this.nodes[location].Location.findLongestDistance(tempChecked);
            }
        }
        
        if(Object.keys(distances).length == 0){
            return 0;
        }

        var shortestDistance;
        var shortestLocation;

        for(var location in distances){
            if(shortestDistance == undefined){
                shortestDistance = distances[location];
                shortestLocation = location;
            }
            
            if(distances[location] >= shortestDistance){
                shortestDistance = distances[location];
                shortestLocation = location;
            }
        }
        return this.nodes[shortestLocation].distance + shortestDistance;
    }
}

// checked

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
    var lineArray = input.split('\n');
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        if(line != ""){
            const data = line.split(" ");
            // locA | to | locb | = | distance
            var locA = data[0]; 
            var locB = data[2];
            const distance = parseInt(data[4]);

            if(locations[locA] == undefined){
                locations[locA] = new Location(locA);
            }
            
            var LocationA = locations[locA];

            if(locations[locB] == undefined){
                locations[locB] = new Location(locB);
            }

            var LocationB = locations[locB];

            LocationA.nodes[locB] = {Location: LocationB, distance};
            LocationB.nodes[locA] = {Location: LocationA, distance};

        }
    }
    
    var distances = [];
    for(var location in locations){
        distances.push(locations[location].findShortestDistance());
    }

    var shortestDistance;
    for(var distance in distances){
        if(shortestDistance == undefined){
            shortestDistance = distances[distance];
        }

        if(shortestDistance > distances[distance]){
            shortestDistance = distances[distance];
        }
    }

    return shortestDistance;
}

function runCode2(){
    var input = getInput();
    var lineArray = input.split('\n');
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        if(line != ""){
            const data = line.split(" ");
            // locA | to | locb | = | distance
            var locA = data[0]; 
            var locB = data[2];
            const distance = parseInt(data[4]);

            if(locations[locA] == undefined){
                locations[locA] = new Location(locA);
            }
            
            var LocationA = locations[locA];

            if(locations[locB] == undefined){
                locations[locB] = new Location(locB);
            }

            var LocationB = locations[locB];

            LocationA.nodes[locB] = {Location: LocationB, distance};
            LocationB.nodes[locA] = {Location: LocationA, distance};

        }
    }
    
    var distances = [];
    for(var location in locations){
        distances.push(locations[location].findLongestDistance());
    }

    var shortestDistance;
    for(var distance in distances){
        if(shortestDistance == undefined){
            shortestDistance = distances[distance];
        }

        if(shortestDistance < distances[distance]){
            shortestDistance = distances[distance];
        }
    }

    return shortestDistance;
}