const placeholder = {
    use: false,
    value:``
}

class Character {
    constructor(name, HP, damage, armor){
        this.name = name;
        this.HP = HP;
        this.damage = damage;
        this.armor = armor;
        this.alive = true;
        this.cost = 0;
        this.items = [];
    }

    fight(other){
        this.fightTurn(other);

        if(other.alive){
            other.fightTurn(this);
        }

        if(this.alive && other.alive){
            return this.fight(other);
        } else if(this.alive){
            return true;
        } else {
            return false;
        }
    }

    copy(){
        var newCharacter = new Character(this.name, this.HP, this.damage, this.armor);
        return newCharacter;
    }

    fightTurn(other){
        // 
        var damage = this.damage - other.armor;
        damage = damage > 1 ? damage : 1;

        //console.log(`The ${this.name} deals ${this.damage}-${other.armor} = ${damage} damage; the ${other.name} goes down to ${other.HP - damage} hit points.`);
        other.takeDamage(damage);
    }

    takeDamage(amount){
        this.HP -= amount;
        if(this.HP < 1){
            this.HP = 0;
            this.alive = false;
            //console.log(`${this.name} is dead!`);
        }
    }

    equipItem(item){
        this.cost += item[0];
        this.damage += item[1];
        this.armor += item[2];
        this.items.push(item);
    }
}




function getInput(){
    if(placeholder.use){
        return placeholder.value;
    }
    return document.getElementsByTagName("iframe")[0].contentWindow.document.body.innerText;
}

function getStoreInput(){
    return {
        Weapons: {
            Dagger:        [8,     4,       0],
            Shortsword:   [10,     5,       0],
            Warhammer:    [25,     6,       0],
            Longsword:    [40,     7,       0],
            Greataxe:     [74,     8,       0]
        },

        Armor: {
            Leather:      [13,     0,       1],
            Chainmail:    [31,     0,       2],
            Splintmail:   [53,     0,       3],
            Bandedmail:   [75,     0,       4],
            Platemail:   [102,     0,       5]
        },

        Rings: {
            Damage1:    [25,     1,       0],
            Damage2:    [50,     2,       0],
            Damage3:   [100,     3,       0],
            Defense1:   [20,     0,       1],
            Defense2:   [40,     0,       2],
            Defense3:   [80,     0,       3]
        }
    }
}

function runCode(){
    function checkFunction(tempPlayer, gold) {
        if(tempPlayer.alive){
            if(gold == undefined || gold > tempPlayer.cost){
                return tempPlayer.cost;
            } else {
                return gold;
            }
        } else {
            return gold;
        }
    }

    return mainFunction(checkFunction);
}

function runCode2(){
    function checkFunction(tempPlayer, gold) {
        if(!tempPlayer.alive){
            if(gold == undefined || gold < tempPlayer.cost){
                console.log(tempPlayer);
                return tempPlayer.cost;
            } else {
                return gold;
            }
        } else {
            return gold;
        }
    }

    return mainFunction(checkFunction);
}

function mainFunction(checkFunction){
    const input = getInput();

    var player = new Character("Player", 100, 0, 0);
    var boss = buildBoss(input);

    var gold = checkAllInventory(player, boss, checkFunction);
    return gold;
}

function buildBoss(input){
    var boss;
    
    lineArray = input.split("\n");
    const Name = "Boss";
    const HP = lineArray[0].split(" ").pop();
    const Damage = lineArray[1].split(" ").pop();
    const Armor = lineArray[2].split(" ").pop();

    var boss = new Character(Name, HP, Damage, Armor);

    return boss;
}



function checkAllInventory(player, boss, checkFunction){
    var gold;

    const store = getStoreInput();
    const Weapons = Object.keys(store["Weapons"])
    const Armor = Object.keys(store["Armor"])
    const Rings = Object.keys(store["Rings"])
    for(var w = 0; w < Weapons.length; w++){
        // weapons loop
        for(var a = -1; a < Armor.length; a++){
            // weapons loop
            for(var r1 = -1; r1 < Rings.length; r1++){
                //ring1 loop
                for(var r2 = r1; r2 < Rings.length; r2++){
                    //ring2 loop
                    var tempPlayer = player.copy();
                    var tempBoss = boss.copy();

                    tempPlayer.equipItem(store["Weapons"][Weapons[w]]);

                    if(a != -1){
                        tempPlayer.equipItem(store["Armor"][Armor[a]]);
                    }
                    if(r1 != -1){
                        tempPlayer.equipItem(store["Rings"][Rings[r1]]);
                    }
                    if(r2 != r1){
                        tempPlayer.equipItem(store["Rings"][Rings[r2]]);
                    }

                    tempPlayer.fight(tempBoss);

                    gold = checkFunction(tempPlayer, gold);
                }
            }
        }
    }

    return gold;
}