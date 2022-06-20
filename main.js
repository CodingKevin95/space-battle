class Spaceship {
    constructor (name, hull, firePower, accuracy,life) {
        this.name = name,
        this.hull = hull,
        this.firePower = firePower,
        this.accuracy = accuracy;
    }
    chanceOfHitting (accuracy) {
        if (Math.random() < this.accuracy) {
        return true
        } else {
            return false
        }
    }
}

let game = {
    round: 0,
    targetShip: 0,
    userInput: "",
  };

//User ship stats
let USSHelloWorld = new Spaceship('USSHelloWorld', 20, 5, .7)
console.log(USSHelloWorld)

//randomize firepower and hull
function alienRandomStats (lowStat, highStat) {
    return Math.round(Math.random() * (highStat - lowStat)) + lowStat
}

//randomize accuracy
function randomAccuracy (lowStat, highStat) {
    return Math.round(Math.random() * ((highStat - lowStat)) + lowStat) / 10
}

//creating alien ships
let alienArmy = []
function creatingShips () {
for (let i = 0; i < 6; i++) {
    alienArmy[i] = new Spaceship(`Alien Spaceship ${[i+1]}`, alienRandomStats(3, 6), alienRandomStats(2, 4), alienRandomStats(6, 8) / 10)
    console.log(alienArmy[i]);
}
}



let shipsBattle = (ship1, ship2) => {
    let ships = [ship1, ship2];
    let attack = false;
    let attacking = 0;
    let attacked = 1;
    let x;
    console.log("%c SPACEBATTLE  \n-------------", "font-size: 30px");
    while (ships[attacked].hull > 0) {
      // Display who is attacking who
      if (ships[attacked].hull > 0) {
        console.log("\n");
        console.log(
          `%c ${ships[attacking].name} is attacking ${ships[attacked].name}!`,
          "color: green; font-size: 14px;"
        );
        //Calculate the battle phase and see if the ship hit or miss
        attack = ships[attacking].chanceOfHitting();
        if (attack === true) {
          ships[attacked].hull -= ships[attacking].firePower;
          console.log(`%c DIRECT HIT! ${ships[attacking].name} has hit ${ships[attacked].name} for ${ships[attacking].firePower} damage`, 'color: red; font-size: 14px;')
          console.log(`%c ${ships[attacked].name}'s hull: ${ships[attacked].hull}`, 
          'font-size: 14px;')
          console.log('%c ___________________', 'font-size: 20px' );
        } else {
          console.log(
            `%c Missed! ${ships[attacked].name} dogded ${ships[attacking].name}'s lazers`,
            "color: red; font-size: 16px;"
          )
          console.log(`%c ${ships[attacked].name}'s hull: ${ships[attacked].hull}`, 
          'font-size: 14px')
          console.log('%c ___________________', 'font-size: 20px' )
          ;
        }
        // Check if attacked ship is alive 
        if (ships[attacked].hull <= 0) {
          console.log( `%c ${ships[attacked].name} has been destroyed`,
            "color: red; border: 5px solid grey; font-size: 16px; background: lightblue;"
          );
          if (ships[attacked] === USSHelloWorld) {
            ///Once user ship is destroyed, alert user and end game
            alert("Oh no the USSHELLOWORLD has been destryed, the world is doomed!!!");
          } else if (
            ships[attacked].name === alienArmy[alienArmy.length - 1].name
          ) {
            alert(
              `All the alien ships have been defeated, congrats!\nRefresh the page to have another adventure`);
          }
          //let player know which ship was destroyed and ask if they'd like to continue
          else {
            game.userResponse = prompt(
              `${alienArmy[game.targetShip].name} has blown up\n${
                USSHelloWorld.name
              } Hull: ${
                USSHelloWorld.hull
              }\nAnother alien ship has appeared! ATTACK or RETREAT from battle?`,
              ""
            );
            game.targetShip += 1;
            promptUser();
            return;
          }
        } else {
          // Take turns to attack and defend
          x = attacking;
          attacking = attacked;
          attacked = x;
        }
      }
    }
  };
  // Ask user if they want to continue or not
  let promptUser = () => {
    let responseUpperCase = game.userInput.toUpperCase();
    if (responseUpperCase === "ATTACK") {
      shipsBattle(USSHelloWorld, alienArmy[game.targetShip]);
    } else if (responseUpperCase === "RETREAT") {
      alert("You have retreated for repair, refresh the page to play again");
    }
  };
  
  let startGame = () => {
    creatingShips();
  
    game.userInput = prompt(
      "Before starting please inspect the page and view console.\nIncoming enemy!\nWould you like to ATTACK the first ship or RETREAT?",
      ""
    );
    promptUser();
  };
  
  startGame();