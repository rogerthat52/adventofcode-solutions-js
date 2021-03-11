function solution1(){
    var floor = 0;
    var input = getInput();
    for(var i = 0;i< input.length;i++){
        var char = input.charAt(i);
        if(char == '('){
            floor++;
        } else if(char == ')'){
            floor--;
        }
    }
    return floor;
}

function solution2(){
    var floor = 0;
    var input = getInput();
    for(var i = 0;i< input.length;i++){
        var char = input.charAt(i);
        if(char == "("){
            floor++;
        } else if(char == ")"){
            floor--;
        }
        if(floor < 0){
            return i+1;
        }
    }
}

function getInput() {
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}

