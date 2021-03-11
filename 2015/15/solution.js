class Ingredient {
    constructor(name, capacity, durability, flavor, texture, calories){
        this.name = name;
        this.capacity = capacity;
        this.durability = durability;
        this.flavor = flavor;
        this.texture = texture;
        this.calores = calories;
    }

}

class Recipe {
    constructor(ingredients){
        this.ingredients = ingredients;
    }
    // ingredients = { "Butterscotch: {teaspoons: 44, ingredient: ref->Butterscotch} "}


    totalScore(){
        var totalCapacity = 0;
        var totalDurability = 0;
        var totalFlavor = 0;
        var totalTexture = 0;

        for(var index in this.ingredients){
            var ingredient = this.ingredients[index].ingredient;
            var teaspoons = this.ingredients[index].teaspoons;

            totalCapacity += ingredient.capacity * teaspoons;
            totalDurability += ingredient.durability * teaspoons;
            totalFlavor += ingredient.flavor * teaspoons;
            totalTexture += ingredient.texture * teaspoons;
        }

        totalCapacity = totalCapacity > 0 ? totalCapacity : 0;
        totalDurability = totalDurability > 0 ? totalDurability : 0;
        totalFlavor = totalFlavor > 0 ? totalFlavor : 0;
        totalTexture = totalTexture > 0 ? totalTexture : 0;


        var totalScore = totalCapacity * totalDurability * totalFlavor * totalTexture;
        return totalScore;
    }

    totalScoreAtCal(targetCalories){
        var totalCapacity = 0;
        var totalDurability = 0;
        var totalFlavor = 0;
        var totalTexture = 0;
        var totalCalories = 0;

        for(var index in this.ingredients){
            var ingredient = this.ingredients[index].ingredient;
            var teaspoons = this.ingredients[index].teaspoons;

            totalCapacity += ingredient.capacity * teaspoons;
            totalDurability += ingredient.durability * teaspoons;
            totalFlavor += ingredient.flavor * teaspoons;
            totalTexture += ingredient.texture * teaspoons;
            totalCalories += ingredient.calores * teaspoons;
        }

        totalCapacity = totalCapacity > 0 ? totalCapacity : 0;
        totalDurability = totalDurability > 0 ? totalDurability : 0;
        totalFlavor = totalFlavor > 0 ? totalFlavor : 0;
        totalTexture = totalTexture > 0 ? totalTexture : 0;

        var totalScore = totalCapacity * totalDurability * totalFlavor * totalTexture;
        
        if(totalCalories == targetCalories){
            return totalScore;
        } else {
            return 0;
        }
    }
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
    var ingredients = buildIngredients(input);
    var ingredientsList = Object.keys(ingredients);

    array = [];
    allArrays = [];
    splitHundo(array, allArrays);


    var maxScore = 0;
    for(var index in allArrays){
        var list = allArrays[index];

        var tempIngredients = {
            [ingredientsList[0]]:{teaspoons:list[0],ingredient:ingredients[ingredientsList[0]]},
            [ingredientsList[1]]:{teaspoons:list[1],ingredient:ingredients[ingredientsList[1]]},
            [ingredientsList[2]]:{teaspoons:list[2],ingredient:ingredients[ingredientsList[2]]},
            [ingredientsList[3]]:{teaspoons:list[3],ingredient:ingredients[ingredientsList[3]]}
        }

        var tempRecipe = new Recipe(tempIngredients);

        var score = tempRecipe.totalScore();

        if(maxScore == undefined || maxScore < score){
            maxScore = score;
            console.log(score);
            console.log(tempRecipe);
        }
    }

    return maxScore;
}

function runCode2(){
    var input = getInput();
    var ingredients = buildIngredients(input);
    var ingredientsList = Object.keys(ingredients);

    array = [];
    allArrays = [];
    splitHundo(array, allArrays);


    var maxScore = 0;
    for(var index in allArrays){
        var list = allArrays[index];

        var tempIngredients = {
            [ingredientsList[0]]:{teaspoons:list[0],ingredient:ingredients[ingredientsList[0]]},
            [ingredientsList[1]]:{teaspoons:list[1],ingredient:ingredients[ingredientsList[1]]},
            [ingredientsList[2]]:{teaspoons:list[2],ingredient:ingredients[ingredientsList[2]]},
            [ingredientsList[3]]:{teaspoons:list[3],ingredient:ingredients[ingredientsList[3]]}
        }

        var tempRecipe = new Recipe(tempIngredients);

        var score = tempRecipe.totalScoreAtCal(500);

        if(maxScore == undefined || maxScore < score){
            maxScore = score;
            console.log(score);
            console.log(tempRecipe);
        }
    }

    return maxScore;
}

function splitHundo(array, allArrays){
    const limit = 100;
    const length = 4;
    if(array.length == length){
        allArrays.push(array);
    } else {
        for(var i = 0; i < limit;i++){
            var arrayTotal = 0;
            for(var c = 0; c < array.length; c++){
                arrayTotal += array[c];
            }

            var tempArray = array.slice(0);

            if(array.length == length - 1){
                tempArray.push(limit - arrayTotal);
                splitHundo(tempArray, allArrays);
                i = limit;
            }

            if(arrayTotal + i <= limit && array.length < length - 1){
                tempArray.push(i);
                splitHundo(tempArray, allArrays);
            } else if(arrayTotal + i > limit) {
                i = limit;
            }
        }
    }
}

function buildIngredients(input){
    var ingredients = {};
    
    lineArray = input.split("\n");
    for(const lineNum in lineArray){
        const line = lineArray[lineNum];
        if(line.length > 1){
            var data = line.split(" ");

            var Name = data[0].replace(":", "");
            var Capacity = parseInt(data[2]);
            var Durability = parseInt(data[4]);
            var Flavor = parseInt(data[6]);
            var Texture = parseInt(data[8]);
            var Calories = parseInt(data[10]);

            ingredients[Name] = new Ingredient(Name, Capacity, Durability, Flavor, Texture, Calories);
        }
    }

    return ingredients;
}