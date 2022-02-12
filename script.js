let cardsMap = new Map();
let cardsPointer = [];

let player1Map = new Map();
let player2Map = new Map();
let player3Map = new Map();
let player4Map = new Map();
let floorMap = new Map();

let player1Pointer = [];
let player2Pointer = [];
let player3Pointer = [];
let player4Pointer = [];
let floorPointer = [];

let p1score = 0;
let p2score = 0;
let p3score = 0;
let p4score = 0;

let firstCard = 0;

let roundCounter = 1;

function buySun(){
    console.log("sun");
}

let player1ui = document.getElementById("player-1-space");
let player2ui = document.getElementById("player-2-space");
let player3ui = document.getElementById("player-3-space");
let player4ui = document.getElementById("player-4-space");
let floorui = document.getElementById("floor-space");
function createCards(){



    let type ="";
    for(let i = 1 ; i <= 4 ; i++){
        if(i==1){
            type = "h";
        }
        if(i==2){
            type = "s";
        }
        if(i==3){
            type = "d";
        }
        if(i==4){
            type = "c"
        }
        let subType = "";
        for(let j = 7 ; j<= 14 ;j++){
            let value = j;
            let subType = j+"_"+type+".png";
            
            cardsMap.set(subType, value);
            cardsPointer.push(subType);
            
            
        }
    }
}

function shuffleCards(){
    // this function will shuffle the cards pointer
  let currentIndex = cardsPointer.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [cardsPointer[currentIndex], cardsPointer[randomIndex]] = [
      cardsPointer[randomIndex], cardsPointer[currentIndex]];
  }

}

function updateUI(){
    player1ui.innerHTML = "";
    player2ui.innerHTML = "";
    player3ui.innerHTML = "";
    player4ui.innerHTML = "";
    floorui.innerHTML = "";
    p1ui(0);
    p2ui(0);
    p3ui(0);
    p4ui(0);
    floorUI(0);
    
}


let turnToPlay = 4;


function p1ui(i){
    setTimeout(()=>{
            if(i < player1Pointer.length){
                let card = document.createElement("img");
                let id = player1Pointer[i];

                console.log(player1Pointer);
                card.setAttribute("src", "./assets/Playing Cards/PNG-cards-1.3/"+"cover.png");
                card.setAttribute("class", "card");
                card.setAttribute("id", id);

                card.style.marginRight = "-40px";
                card.setAttribute("data-value", player1Map.get(id));
                card.setAttribute("data-player", 1);
                card.addEventListener("click", ()=>{
                    if(turnToPlay == 1){
                        player1ui.removeChild(card);
                        card.setAttribute("class", "top-card-floor");
                        card.setAttribute("src", "./assets/Playing Cards/PNG-cards-1.3/"+id);

                        floorui.appendChild(card);
                        floorPointer.push(id);
                        floorMap.set(id, player1Map.get(id));
                        turnToPlay = 2;
                        player1Pointer.splice(player1Pointer.indexOf(id), 1);
                        player1Map.delete(id);
                        checkFloorMax();
                    }
                });
                player1ui.appendChild(card);
                i++;
                
                p1ui(i);
            }
            else{
                clearInterval();
            }
            
        },50);
}

function p2ui(i){
    setTimeout(()=>{
            if(i < player2Pointer.length){
                let card = document.createElement("img");
                let id = player2Pointer[i];

                card.setAttribute("src", "./assets/Playing Cards/PNG-cards-1.3/"+"cover.png");
                card.setAttribute("class", "card");
                card.style.marginTop = "-10px"
                card.setAttribute("id", id);
                card.style.marginBottom = "-60px";
                card.style.transform = "rotate(90deg)";
                card.setAttribute("data-value", player2Map.get(id));
                card.setAttribute("data-player", 2);
                card.addEventListener("click", ()=>{
                    if(turnToPlay == 2){
                        player2ui.removeChild(card);
                        card.setAttribute("class", "left-card-floor");
                        card.style.transform = "";
                        card.setAttribute("src", "./assets/Playing Cards/PNG-cards-1.3/"+id);

                        floorui.appendChild(card);
                        floorPointer.push(id);
                        floorMap.set(id, player2Map.get(id));
                        turnToPlay = 4;
                        player2Pointer.splice(player2Pointer.indexOf(id), 1);
                        player2Map.delete(id);
                        checkFloorMax();
                    }
                });
                player2ui.appendChild(card);
                i++;
                p2ui(i);
            }
            else{
                clearInterval();
            }
            
        },50);
}

function buy(){
    secondDistribution();
        sortCards();
}

function skip(){
    firstCard = 0;
    turnToPlay = 4;
    p1score = 0;
    p2score = 0;
    p3score = 0;
    p4score = 0;

    firstCard = 0;

    roundCounter = 1;
    firstDistribution();
    sortCards();


}

function p3ui(i){
    setTimeout(()=>{
            if(i < player3Pointer.length){
                let card = document.createElement("img");
                let id = player3Pointer[i];
                card.setAttribute("src", "./assets/Playing Cards/PNG-cards-1.3/"+"cover.png");
                card.setAttribute("class", "card");
                card.style.marginTop = "-10px";
                card.setAttribute("id", id);

                card.style.marginBottom = "-60px";
                card.style.transform = "rotate(270deg)";
                card.setAttribute("data-player", 3);
                card.setAttribute("data-value", player3Map.get(id));
                player3ui.appendChild(card);
                card.addEventListener("click", ()=>{
                    if(turnToPlay == 3){
                        player3ui.removeChild(card);
                        card.setAttribute("src", "./assets/Playing Cards/PNG-cards-1.3/"+id);

                        card.setAttribute("class", "right-card-floor");
                        card.style.transform = "";
                        floorui.appendChild(card);
                        floorPointer.push(id);
                        floorMap.set(id, player3Map.get(id));
                        turnToPlay = 1;
                        player3Pointer.splice(player3Pointer.indexOf(id), 1);
                        player3Map.delete(id);
                        checkFloorMax();
                    }
                });
                i++;
                p3ui(i);
            }
            else{
                clearInterval();
            }
            
        },50);
}

function p4ui(i){
    setTimeout(()=>{
            if(i < player4Pointer.length){
                let card = document.createElement("img");
                let id = player4Pointer[i];
                card.setAttribute("src", "./assets/Playing Cards/PNG-cards-1.3/"+id);
                card.setAttribute("class", "card");
                card.setAttribute("id", id);
                card.setAttribute("data-value", player4Map.get(id));

                card.style.marginRight = "-40px"
                card.setAttribute("data-player", 4);
                card.addEventListener("click", ()=>{
                    if(turnToPlay == 4){
                        
                        player4ui.removeChild(card);
                        // console.log(id);
                        card.setAttribute("class", "bottom-card-floor");
                        floorui.appendChild(card);
                        floorPointer.push(id);
                        floorMap.set(id, player4Map.get(id));
                        turnToPlay = 3;
                        player4Pointer.splice(player4Pointer.indexOf(id), 1);
                        player4Map.delete(id);
                        checkFloorMax();
                    }
                });
                player4ui.appendChild(card);
                i++;
                p4ui(i);
            }
            else{
                clearInterval();
            }
            
        },50);
        
}

function floorUI(i){
    setTimeout(()=>{
            if(i < floorPointer.length){
                let card = document.createElement("img");
                card.setAttribute("src", "./assets/Playing Cards/PNG-cards-1.3/"+floorPointer[i]);
                card.setAttribute("class", "card");
                card.setAttribute("id", floorPointer[i]);
                card.setAttribute("data-value", floorMap.get(floorPointer[i]))
                card.style.marginRight = "10px"
                floorui.appendChild(card);
                i++;
                floorUI(i);
            }
            else{
                clearInterval();
            }
            
        },50);
}

function getPlayedCardType(pointer){
    if(pointer.includes("h")){
        return "h";
    }
    if(pointer.includes("s")){
        return "s";
    }
    if(pointer.includes("c")){
        return "c";
    }
    if(pointer.includes("d")){
        return "d";
    }
}

function checkFloorMax(){
    
    let max = 0;
    let sum = 0;
    let player = 0;
    let baseType = getPlayedCardType(floorPointer[0]);
    let baseValue = floorMap.get(floorPointer[0]);
    if(floorPointer.length == 4){
        roundCounter++;
        for(let i = 0 ;i < floorPointer.length ; i++){
            let id = floorPointer[i];
            let d = document.getElementById(id);
            // console.log(floorMap);
            if(id.includes(baseType)){
                if (max < floorMap.get(id)) {
                    max = floorMap.get(id);
                    firstCard = +document.getElementById(id).dataset.player;
                    player = +d.dataset.player;
                }
            }
            sum += floorMap.get(id);
        }
        if(player == 1){
            p1score += sum;
        }
        if(player == 2){
            p2score += sum;
        }
        if(player == 3){
            p3score += sum;
        }
        if(player == 4){
            p4score+=sum;
            
        }
        turnToPlay = player;
        console.log(turnToPlay);

        updateScores();
        setTimeout(()=>{
            floorui.innerHTML = "";
        }, 1000);


        floorPointer = [];
        floorMap.delete();

    }
    
    if(roundCounter <=8){
        checkTurn(baseType, baseValue);
    }
    


    
}
function checkTurn(baseType1, baseValue1) {
  if (turnToPlay == 1) {
    setTimeout(function(baseType=baseType1, baseValue=baseValue1){
         let cardToPlay = "";
        let haveValue = false;
        let minDiff = "";
        let minDiffValue = 1000;
        let min = 1000;
        for(let i = 0 ;i < player1Pointer.length ; i++){
            let key = player1Pointer[i];
            let value = player1Map.get(key);
            if(key.includes(baseType)){
                haveValue = true;
                if(value > baseValue){
                    cardToPlay = key;
                    break;
                }
                if(min> value){
                    min = value;
                    cardToPlay = key;
                }
            }
            if(minDiffValue > value){
                minDiffValue = value;
                minDiff = key;
            }
        }
        if(haveValue == false){
            cardToPlay = minDiff;
        }
        document.getElementById(cardToPlay).click();
    }, 1000);
  }

  if (turnToPlay == 2) {
      setTimeout(function (baseType = baseType1, baseValue = baseValue1) {
        let cardToPlay = "";
        let haveValue = false;
        let minDiff = "";
        let minDiffValue = 1000;
        let min = 1000;
        for (let i = 0; i < player2Pointer.length; i++) {
          let key = player2Pointer[i];
          let value = player2Map.get(key);
          if (key.includes(baseType)) {
            haveValue = true;
            if (value > baseValue) {
              cardToPlay = key;
              break;
            }
            if (min > value) {
              min = value;
              cardToPlay = key;
            }
          }
          if (minDiffValue > value) {
            minDiffValue = value;
            minDiff = key;
          }
        }
        if(haveValue == false){
            cardToPlay = minDiff;
        }
        document.getElementById(cardToPlay).click();
      }, 1000);
  }
  if (turnToPlay == 3) {
    setTimeout(function(baseType=baseType1, baseValue=baseValue1){
        console.log(baseValue);

        let cardToPlay = "";
        let haveValue = false;
        let minDiff = "";
        let minDiffValue = 1000;
        let min = 1000;
        for(let i = 0 ;i < player3Pointer.length ; i++){
            let key = player3Pointer[i];
            let value = player3Map.get(key);
            if(key.includes(baseType)){
                haveValue = true;
                if(value > baseValue){
                    cardToPlay = key;
                    console.log(key);
                    break;
                }
                if(min> value){
                    min = value;
                    cardToPlay = key;
                }
            }
            if(minDiffValue > value){
                minDiffValue = value;
                minDiff = key;
            }
        }
        if(haveValue == false){
            cardToPlay = minDiff;
        }
        document.getElementById(cardToPlay).click();
    }, 1000);
  }
}


function AI(baseType, baseValue){
    if(turnToPlay == 3){
        
    }
    if(turnToPlay == 1){
       
    }

    if(turnToPlay == 2){
        
    }

}



function updateScores(){
    let p1 = document.getElementById("p1score");
    let p2 = document.getElementById("p2score");
    let p3 = document.getElementById("p3score");
    let p4 = document.getElementById("p4score");
    p1.innerHTML = p1score;
    p2.innerHTML = p2score;
    p3.innerHTML = p3score;
    p4.innerHTML = p4score;
}

function firstDistribution(){
    player1Pointer = [];
    player2Pointer = [];
    player3Pointer = [];
    player4Pointer = [];

    player1Map.delete();
    player2Map.delete();
    player3Map.delete();
    player4Map.delete();

    floorMap.delete();
    floorPointer = [];

    cardsPointer = [];
    cardsMap.delete();
    
    createCards();
    shuffleCards();
    shuffleCards();
    shuffleCards();


    // temp (give all aces to player 4)
    // let t1 = cardsPointer.splice(cardsPointer.indexOf("ace_of_spades.png"), 1);
    // player4Pointer.push("ace_of_spades.png");
    // player4Map.set("ace_of_spades.png", cardsMap.get("ace_of_spades.png"));
    // cardsMap.delete("ace_of_spades.png");

    // let t2 = cardsPointer.splice(cardsPointer.indexOf("ace_of_hearts.png"), 1);
    // player4Pointer.push("ace_of_hearts.png");
    // player4Map.set("ace_of_hearts.png", cardsMap.get("ace_of_hearts.png"));
    // cardsMap.delete("ace_of_hearts.png");

    // let t3 = cardsPointer.splice(cardsPointer.indexOf("ace_of_clubs.png"), 1);
    // player4Pointer.push("ace_of_clubs.png");
    // player4Map.set("ace_of_clubs.png", cardsMap.get("ace_of_clubs.png"));
    // cardsMap.delete("ace_of_clubs.png");
    // let t4 = cardsPointer.splice(cardsPointer.indexOf("ace_of_diamonds.png"), 1);
    // player4Pointer.push("ace_of_diamonds.png");
    // player4Map.set("ace_of_diamonds.png", cardsMap.get("ace_of_diamonds.png"));
    // cardsMap.delete("ace_of_diamonds.png");

    for(let i = 0 ;i < 5 ; i++){
        let temp = cardsPointer.pop();
        player1Pointer.push(temp);
        player1Map.set(temp, cardsMap.get(temp));
        cardsMap.delete(temp);
    }
        

    for(let i = 0 ;i < 5 ; i++){
        let temp = cardsPointer.pop();
        player2Pointer.push(temp);
        player2Map.set(temp, cardsMap.get(temp));
        cardsMap.delete(temp);
    }

    for(let i = 0 ;i < 5 ; i++){
        let temp = cardsPointer.pop();
        player3Pointer.push(temp);
        player3Map.set(temp, cardsMap.get(temp));
        cardsMap.delete(temp);
    }

    // change it to 5 below i < 5
    for(let i = 0 ;i < 5 ; i++){
        let temp = cardsPointer.pop();
        player4Pointer.push(temp);
        player4Map.set(temp, cardsMap.get(temp));
        cardsMap.delete(temp);
    }


    let temp = cardsPointer.pop();
        floorPointer.push(temp);
        floorMap.set(temp, cardsMap.get(temp));
        cardsMap.delete(temp);


        updateUI();

}



function secondDistribution(){
    for(let i = 0 ;i < 3 ; i++){
        let temp = cardsPointer.pop();
        player1Pointer.push(temp);
        player1Map.set(temp, cardsMap.get(temp));
        cardsMap.delete(temp);
    }
    for(let i = 0 ;i < 3 ; i++){
        let temp = cardsPointer.pop();
        player2Pointer.push(temp);
        player2Map.set(temp, cardsMap.get(temp));
        cardsMap.delete(temp);
    }

    for(let i = 0 ;i < 3 ; i++){
        let temp = cardsPointer.pop();
        player3Pointer.push(temp);
        player3Map.set(temp, cardsMap.get(temp));
        cardsMap.delete(temp);
    }
    for(let i = 0 ;i < 2 ; i++){
        let temp = cardsPointer.pop();
        player4Pointer.push(temp);
        player4Map.set(temp, cardsMap.get(temp));
        cardsMap.delete(temp);
    }

    let temp = floorPointer.pop();
        player4Pointer.push(temp);
        player4Map.set(temp, floorMap.get(temp));
        floorMap.delete(temp);
        updateUI();
}



// createCards();

// shuffleCards();

// firstDistribution();
// console.log(player1Pointer);

 let diamonds = [];
 let clubs = [];
 let spades = [];
 let hearts = [];
function sortCards(){
    var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

    diamonds = [];
    clubs = [];
    spades = [];
    hearts = [];
    for(let i = 0 ;i < player1Pointer.length ; i++){
        if(getPlayedCardType(player1Pointer[i]) == "d"){
            diamonds.push(player1Pointer[i]);
        }
        if(getPlayedCardType(player1Pointer[i]) == "c"){
            clubs.push(player1Pointer[i]);
            
        }
        if(getPlayedCardType(player1Pointer[i]) == "s"){
            spades.push(player1Pointer[i]);
            
        }
        if(getPlayedCardType(player1Pointer[i]) == "h"){
            hearts.push(player1Pointer[i]);
            
        }
    }
    hearts = hearts.sort(collator.compare);
    diamonds = diamonds.sort(collator.compare);
    clubs = clubs.sort(collator.compare);
    spades = spades.sort(collator.compare);

    player1Pointer = [];
    
    for(let i = 0 ;i < clubs.length ;i++){
        player1Pointer.push(clubs[i]);
    }
    for (let i = 0; i < diamonds.length; i++) {
      player1Pointer.push(diamonds[i]);
    }
    for(let i = 0 ;i < spades.length ;i++){
        player1Pointer.push(spades[i]);
    }
    for(let i = 0 ;i < hearts.length ;i++){
        player1Pointer.push(hearts[i]);
    }




    diamonds = [];
    clubs = [];
    spades = [];
    hearts = [];
    for(let i = 0 ;i < player2Pointer.length ; i++){
        if(getPlayedCardType(player2Pointer[i]) == "d"){
            diamonds.push(player2Pointer[i]);
        }
        if(getPlayedCardType(player2Pointer[i]) == "c"){
            clubs.push(player2Pointer[i]);
            
        }
        if(getPlayedCardType(player2Pointer[i]) == "s"){
            spades.push(player2Pointer[i]);
            
        }
        if(getPlayedCardType(player2Pointer[i]) == "h"){
            hearts.push(player2Pointer[i]);
            
        }
    }
    hearts = hearts.sort(collator.compare);
    diamonds = diamonds.sort(collator.compare);
    clubs = clubs.sort(collator.compare);
    spades = spades.sort(collator.compare);

    player2Pointer = [];
    for(let i = 0 ;i < diamonds.length ;i++){
        player2Pointer.push(diamonds[i]);
    }
    for(let i = 0 ;i < clubs.length ;i++){
        player2Pointer.push(clubs[i]);
    }
    for(let i = 0 ;i < spades.length ;i++){
        player2Pointer.push(spades[i]);
    }
    for(let i = 0 ;i < hearts.length ;i++){
        player2Pointer.push(hearts[i]);
    }



    diamonds = [];
    clubs = [];
    spades = [];
    hearts = [];
    for(let i = 0 ;i < player3Pointer.length ; i++){
        if(getPlayedCardType(player3Pointer[i]) == "d"){
            diamonds.push(player3Pointer[i]);
        }
        if(getPlayedCardType(player3Pointer[i]) == "c"){
            clubs.push(player3Pointer[i]);
            
        }
        if(getPlayedCardType(player3Pointer[i]) == "s"){
            spades.push(player3Pointer[i]);
            
        }
        if(getPlayedCardType(player3Pointer[i]) == "h"){
            hearts.push(player3Pointer[i]);
            
        }
    }
    hearts = hearts.sort(collator.compare);
    diamonds = diamonds.sort(collator.compare);
    clubs = clubs.sort(collator.compare);
    spades = spades.sort(collator.compare);

    player3Pointer = [];
    for(let i = 0 ;i < diamonds.length ;i++){
        player3Pointer.push(diamonds[i]);
    }
    for(let i = 0 ;i < clubs.length ;i++){
        player3Pointer.push(clubs[i]);
    }
    for(let i = 0 ;i < spades.length ;i++){
        player3Pointer.push(spades[i]);
    }
    for(let i = 0 ;i < hearts.length ;i++){
        player3Pointer.push(hearts[i]);
    }



    diamonds = [];
    clubs = [];
    spades = [];
    hearts = [];
    for(let i = 0 ;i < player4Pointer.length ; i++){
        if(getPlayedCardType(player4Pointer[i]) == "d"){
            diamonds.push(player4Pointer[i]);
        }
        if(getPlayedCardType(player4Pointer[i]) == "c"){
            clubs.push(player4Pointer[i]);
            
        }
        if(getPlayedCardType(player4Pointer[i]) == "s"){
            spades.push(player4Pointer[i]);
            
        }
        if(getPlayedCardType(player4Pointer[i]) == "h"){
            hearts.push(player4Pointer[i]);
            
        }
    }
    hearts = hearts.sort(collator.compare);
    diamonds = diamonds.sort(collator.compare);
    clubs = clubs.sort(collator.compare);
    spades = spades.sort(collator.compare);

    player4Pointer = [];
    
    for(let i = 0 ;i < clubs.length ;i++){
        player4Pointer.push(clubs[i]);
    }
    for (let i = 0; i < diamonds.length; i++) {
      player4Pointer.push(diamonds[i]);
    }
    for(let i = 0 ;i < spades.length ;i++){
        player4Pointer.push(spades[i]);
    }
    for (let i = 0; i < hearts.length; i++) {
      player4Pointer.push(hearts[i]);
    }

    
// console.log(player4Pointer.sort(collator.compare));
    console.log(player4Pointer );
}