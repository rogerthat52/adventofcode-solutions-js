class Reindeer {
    constructor(name, speed, time, rest){
        this.name = name;
        this.speed = speed;
        this.time = time;
        this.rest = rest;
        this.moving = true;
        this.distance = 0;
        this.points = 0;

        this.movingSec = 0;
        this.restingSec = 0;
    }



    runSecond(){
        if(this.moving){
            this.distance += this.speed;
            this.movingSec++;
        } else {
            this.restingSec++;
        }

        if(this.movingSec == this.time){
            this.movingSec = 0;
            this.moving = false;
        } else if(this.restingSec == this.rest){
            this.restingSec = 0;
            this.moving = true;
        }
    }
}

function solution1(){
    return runCode(2503);
}

function solution2(){
    return runCode2(2503)
}

function getInput() {
    //return `Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds
//Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`
    
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}

function runCode(seconds){
    input = getInput();
    var reindeer = buildReindeer(input);

    for(var i = 0; i < seconds; i++){
        for(var individual in reindeer){
            reindeer[individual].runSecond();
        }
    }

    var maxDistance = 0;

    for(var individual in reindeer){
        var dist = reindeer[individual].distance;
        if(dist > maxDistance){
            maxDistance = dist;
        }
    }

    return maxDistance;
}

function runCode2(seconds){
    input = getInput();
    var reindeer = buildReindeer(input);

    for(var i = 0; i < seconds; i++){
        for(var individual in reindeer){
            reindeer[individual].runSecond();
            
        }
        
        var leadReindeer;

        for(var individual in reindeer){
            console.log(individual);
            var current = reindeer[individual];
            //console.log(current);
            if(leadReindeer == undefined || current.distance > leadReindeer.distance){
                leadReindeer = current;
            }
        }


        leadReindeer.points += 1;
    }

    var maxPoints = 0;

    for(var individual in reindeer){
        var points = reindeer[individual].points;
        if(points > maxPoints){
            maxPoints = points;
        }
    }

    console.log(reindeer);

    return maxPoints + 1;
}

function buildReindeer(input){
    var reindeer = {};
    
    lineArray = input.split("\n");
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        if(line.length > 1){
            var data = line.split(" ");
            console.log(data);

            var Name = data[0];
            var Speed = parseInt(data[3]);
            var Time = parseInt(data[6]);
            var Rest = parseInt(data[13]);

            reindeer[Name] = new Reindeer(Name, Speed, Time, Rest);
        }
    }

    return reindeer;
}