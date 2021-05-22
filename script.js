function computerPlay() {
    /* This will randomly return a String: 'Rock', 'Paper', 'Scissors'. Can use Math.random() and
        generate a relevant number that is tied to each option */
    let value = Math.floor(Math.random() * 3); 
    /* for each random value generated, if === 0/1/2, return the relevant options */
    if (value === 0) {
        return "rock";
    } else if (value === 1) {
        return "paper";
    } else {
        return "scissors";
    }
}

function playRound(playerSelection, computerSelection) {
    /* Need to include the various combinations possible: win/lose/draw;
        Paper/Scissors: Lose; Scissors/Paper: Win;
        Scissors/Rock: Lose; Rock/Scissors: Win;
        Rock/Paper: Lose; Paper/Rock: Win; */
    if (playerSelection === computerSelection) {
        return "draw";
    } else if (playerSelection === "paper" && computerSelection === "scissors" || 
                playerSelection === "scissors" && computerSelection === "rock" || 
                playerSelection === "rock" && computerSelection === "paper") {
        return "lose";
    } else 
        return "win";
}

function getWinner(playerWins, compWins, rounds) {
    if (rounds < 5) {
        return "Quitting game...";
    }
    return (playerWins > compWins) ? "You won the game! Good job!" : "You lost to computer :(";
}

function game() {      
    /* declare a count for compWins and playerWins */
    let compWins = 0;
    let playerWins = 0;
    let rounds = 0;

    /* loop through 5 games; we used a while loop because we not sure how many draws will happen;
        assume that draws will make player and computer choose again */
    while (rounds < 5) {
        /* ask for user input, and enter computer function as well */
        const computerSelection = computerPlay(); 
        let playerSelection = prompt("Rock, Paper or Scissors? Type in lowercase");

        /* check validity of input */
        if (playerSelection === null) {
            console.log("Quitting game...");
            break;
        } else if (playerSelection !== "rock" && playerSelection !== "paper" && playerSelection !== "scissors") {
            console.log("Please enter a valid input!");
            continue;
        } 
        
        /* playRound */
        let result = playRound(playerSelection, computerSelection);
        /* if draw, don't increment rounds */
        if (result === "draw") {
            console.log("It's a draw!")
            continue;
        } else if (result === "win") {
            rounds++;
            playerWins++;
            console.log(`You won the computer! Your wins: ${ playerWins } Computer wins: ${ compWins }`);
        } else {
            rounds++;
            compWins++;
            console.log(`You lost to the computer! Your wins: ${ playerWins } Computer wins: ${ compWins }`);
        }
    }

    let winningMessage = getWinner(playerWins, compWins, rounds);
    alert(winningMessage);
}

game();