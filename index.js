const Dice = require('./models/Dice.js');
const Entities = require('./models/Entities.js');

const playSnakesAndLadders =require('./services/playSnakesAndLadders');


const readlines=require('readline-sync');

const entities=Entities;

const noOfSnakes= readlines.questionInt('Enter the number of snakes you want in game: ');

for(let i=0;i<noOfSnakes;i++){
    const startPosition= readlines.questionInt('Enter the startPosition of snake: ');
    const endPosition= readlines.questionInt('Enter the endPosition of snake: ');
    if(startPosition<endPosition){
        console.log("Invalid Snake , StartPoint should be greater than ending Point")
    }
    entities.setSnake(startPosition,endPosition);
}

const noOfLadders= readlines.questionInt('Enter the number of ladders you want in game: ');

for(let i=0;i<noOfLadders;i++){
    const startPosition= readlines.questionInt('Enter the startPosition of Ladder: ');
    const endPosition= readlines.questionInt('Enter the endPosition of ladder: ');
    if(startPosition>endPosition){
        console.log("Invalid Ladder , StartPoint should be less than ending Point")
    }
    entities.setLadder(startPosition,endPosition);
}

const noOfPlayers= readlines.questionInt('Enter the number of Players you want in game: ');
if(noOfPlayers<2){
    console.log('This is a multiplayer game , Players Should be greater than 1')
}

for(let i=0;i<noOfPlayers;i++){
    const player= readlines.questionInt('Enter the Players number: ');
    
    entities.setPlayer(player,player);
}

const playSnakesAndLadder=new playSnakesAndLadders(noOfPlayers);
playSnakesAndLadder.playGame()
