var totalPaper;
var totalRibbon;

function solution1(){
    calculateData();
    return totalPaper;
}

function solution2(){
    calculateData();
    return totalRibbon;
}

function getInput() {
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}

function calculateData(){
    totalPaper = 0;
    totalRibbon = 0;

    var lineArray = getInput().split("\n");
    lineArray.forEach(
        line => {
            var sizeArray = line.split('x');
            if(sizeArray.length >= 3){
                const l = parseInt(sizeArray[0]); // length
                const w = parseInt(sizeArray[1]); // width
                const h = parseInt(sizeArray[2]); // height
                

                
                totalPaper += calculatePaper(l,w,h);
                totalRibbon += calculateRibbon(l, w, h);
            }
        }
    )
}

function calculatePaper(l, w, h){
    var shortestSide = arguments[0];
    for (let i = 0; i < arguments.length; i++) {
        const side = arguments[i];
        if(side < shortestSide){
            shortestSide = side;
        }
    }

    var sumOfSurface = 2*l*w + 2*w*h + 2*l*h;
    console.log(`total paper: ${sumOfSurface}`);
    return sumOfSurface;
}

function calculateRibbon(l, w, h){
    var longestSide = arguments[0];
    for (let i = 0; i < arguments.length; i++) {
        const side = arguments[i];
        if(side > longestSide){
            longestSide = side;
        }
    }

    var ribbonAround = 2*l+2*w+2*h - 2*longestSide;
    var ribbonBow = l * w * h;
    return ribbonAround + ribbonBow;
}