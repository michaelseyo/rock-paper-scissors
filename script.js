function computerPlay() {
    /* This will randomly return a String: 'Rock', 'Paper', 'Scissors'. Can use Math.random() and
        generate a relevant number that is tied to each option */
    let value = Math.floor(Math.random() * 3); 
    /* for each random value generated, if === 0/1/2, return the relevant options */
    if (value === 0) {
        return "Rock";
    } else if (value === 1) {
        return "Paper";
    } else {
        return "Scissors";
    }
}

function evaluateRound(playerSelection, computerSelection) {
    /* Need to include the various combinations possible: win/lose/draw;
        Paper/Scissors: Lose; Scissors/Paper: Win;
        Scissors/Rock: Lose; Rock/Scissors: Win;
        Rock/Paper: Lose; Paper/Rock: Win; */
    if (playerSelection === computerSelection) {
        return "draw";
    } else if (playerSelection === "Paper" && computerSelection === "Scissors" || 
                playerSelection === "Scissors" && computerSelection === "Rock" || 
                playerSelection === "Rock" && computerSelection === "Paper") {
        return "lose";
    } else 
        return "win";
}

function getWinner(playerWins, compWins) { // the return string we will use to createElement to add in html
    return (playerWins > compWins) ? alert("Match ended.. You won the game! Good job!") : 
                                        alert("Match ended.. You lost to computer :(");
}

function updateScoreBoard(playerWins, compWins, message) {
    // scoring
    const pScore = document.querySelector("#playerScore");
    const cScore = document.querySelector("#compScore");
    const para = document.querySelector('p');  
    const maxScore = 5;

    pScore.textContent = `${ playerWins }`;
    cScore.textContent = `${ compWins }`;
    // message
    if (playerWins === maxScore || compWins === maxScore) {
        return (playerWins > compWins) ? para.textContent = "YOU WON THE GAME" : 
                                        para.textContent = "YOU LOST THE GAME";                              
    } 
    para.textContent = message;
}

function playGame(e) { // plays 1 round only
    const playerSelection = this.textContent;
    const computerSelection = computerPlay(); 
    const maxScore = 5;
    // retrieve current scores
    let playerWins = parseInt(document.querySelector("#playerScore").textContent);
    let compWins = parseInt(document.querySelector("#compScore").textContent);

    if (playerWins === maxScore || compWins === maxScore) {
        return; // so scores dont go above 5 anymore
    }

    let result = evaluateRound(playerSelection, computerSelection);
    if (result === "draw") {
        // no change in scoreboard textContent
        updateScoreBoard(playerWins, compWins, "It's a draw!");
    } else if (result === "win") {
        playerWins++;
        updateScoreBoard(playerWins, compWins, "You won the computer!")
    } else {
        compWins++;
        updateScoreBoard(playerWins, compWins, "You lost to the computer!");
    }
}

// create click process
const buttons = document.querySelectorAll("button");
buttons.forEach(btn => btn.addEventListener('click', playGame));

// player press one of the options
// addEventListener('click', function); the function is to detect which button clicked; put this in const
// use the const, put it into the playRound function
// depending on the outcome of the playRound function, change textContent of the score accordingly
// retrieve the current score and add 1 to it
// the first person with score 5 points wins 
// display winning message by createElement and add to div

// how to ensure that the points don't change after it has ended (aka one player reaches 5 points)