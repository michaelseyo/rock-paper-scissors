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

function updateScoreBoard(playerWins, comWins, message) {
    // scoring
    const pScore = document.querySelector("#playerScore");
    const cScore = document.querySelector("#comScore");
    const para = document.querySelector('p');  
    const maxScore = 5;

    pScore.textContent = `${ playerWins }`;
    cScore.textContent = `${ comWins }`;
    // the first person with score 5 points wins 
    // display winning message by changing textContent 
    if (playerWins === maxScore || comWins === maxScore) {
        return (playerWins > comWins) ? para.textContent = "YOU WON THE GAME" : 
                                        para.textContent = "YOU LOST THE GAME";                              
    } 
    para.textContent = message;
}

function playGame(e) { // plays a round at a time
    const playerSelection = this.textContent;
    const computerSelection = computerPlay(); 
    const maxScore = 5;
    // retrieve current scores
    let playerWins = parseInt(document.querySelector("#playerScore").textContent);
    let comWins = parseInt(document.querySelector("#comScore").textContent);

    if (playerWins === maxScore || comWins === maxScore) {
        return; // so scores dont go above 5 anymore
    }

    let result = evaluateRound(playerSelection, computerSelection);
    if (result === "draw") {
        // no change in scoreboard textContent
        updateScoreBoard(playerWins, comWins, "It's a draw!");
    } else if (result === "win") {
        // retrieve the current score and add 1 to it
        playerWins++;
        updateScoreBoard(playerWins, comWins, "You won this round!")
    } else {
        comWins++;
        updateScoreBoard(playerWins, comWins, "You lost this round!");
    }
}

function upsize(e) {
    console.log(this);
    this.classList.add("button-click");
}

function originalSize(e) {
    this.classList.remove("button-click");
}

// button linked to game logic
const buttons = document.querySelectorAll("button");
buttons.forEach(btn => btn.addEventListener('click', playGame));
// button effects
buttons.forEach(btn => btn.addEventListener('click', upsize));
buttons.forEach(btn => btn.addEventListener('transitionend', originalSize)) 