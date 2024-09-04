const Dice = require('../models/Dice.js');
const Entities = require('../models/Entities.js');
const PairPosition = require('../models/PairPositions.js');

class playSnakesAndLadders{
    constructor(noOfPlayers){
        this.playerHistory= new Map();
        this.playerLatestPosition = new Map();
        this.Entities=Entities;
        this.Dice= new Dice();
        this.noOfPlayers= noOfPlayers;
    }

    initializePlayers() {
        for (let playerName of this.Entities.getPlayers.values()) {
            this.playerLatestPosition.set(playerName, 0);
        }
    }

    playGame(){
        this.initializePlayers();

        let i=-1;
        let winner=null;
        let totalWinners=0;
        let numPlayer=this.noOfPlayers;

        while(totalWinners<numPlayer-1){
            i++;
            if(i>=numPlayer){
                i=0;
            }
            // console.log(this?.Entities?.getPlayers);
            let playerName= Array.from(this?.Entities?.getPlayers?.values())[i];
            let oldPosition=this?.playerLatestPosition?.get(playerName)
            let diceNumber=this?.Dice?.randomDiceValue;
            let endPosition=this?.playerLatestPosition?.get(playerName)+diceNumber;

            let status='';
            if(this.isvalidPosition(endPosition)){
                if(this?.Entities?.getSnakes?.has(endPosition)){
                    let bittenPosition=endPosition;
                    endPosition=this?.Entities?.getSnakes?.get(endPosition);
                    status='after snake bite';
                    console.log(`${playerName} bitten by snake at ${bittenPosition} now land at ${endPosition}`);

                }
                else if(this?.Entities?.getLadders?.has(endPosition)){
                    let ladderPosition=endPosition;
                    endPosition=this?.Entities?.getLadders?.get(endPosition);
                    status='after ladder climb';
                    console.log(`${playerName} take ladder at ${ladderPosition} now land at ${endPosition}`);

                }

                this?.playerLatestPosition?.set(playerName,endPosition);
                console.log(`${playerName} rolled a dice and move from ${oldPosition} to ${endPosition} ${status}`);

                if(this?.hasPlayerWon(playerName)){
                    winner=playerName;
                    totalWinners++;
                    console.log(`${playerName} is Winner`)
                }
            }
        }

    }

    hasPlayerWon(player){
       
        return this.playerLatestPosition.get(player)===100;
    }

    isvalidPosition(position){
        return position <=100;
    }


}

module.exports=playSnakesAndLadders;