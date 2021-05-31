function computerPlay() {
    /* This will randomly return a String: 'Rock', 'Paper', 'Scissors'. Can use Math.random() and
        generate a relevant number that is tied to each option */
    let value = Math.floor(Math.random() * 3); 
    let comIcon = document.querySelector("#com-icon");
    const end = endGame(maxScore);
    if (end) {
        return;
    }
    
    comIcon.classList.add("upsize");
    comIcon.addEventListener("transitionend", removeUpsize);
    /* for each random value generated, if === 0/1/2, return the relevant options */
    if (value === 0) {
        comIcon.src = "icons/com-rock-icon.png";
        return "Rock";
    } else if (value === 1) {
        comIcon.src = "icons/com-paper-icon.png";
        return "Paper";
    } else {
        comIcon.src = "icons/com-scissors-icon.png";
        return "Scissors";
    }
}

function evaluateRound(playerSelection, computerSelection) {
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

    pScore.textContent = `${ playerWins }`;
    cScore.textContent = `${ comWins }`;
    // the first person with score 5 points wins 
    // display winning message by changing textContent 
    if (playerWins === maxScore || comWins === maxScore) {
        const scoreboardMessage = document.querySelector("div.scoreboard-message");
        scoreboardMessage.classList.add("glow");
        scoreboardMessage.classList.add("upsize")
        return (playerWins > comWins) ? para.textContent = "YOU WON THE GAME" : 
                                        para.textContent = "YOU LOST THE GAME";                              
    } 
    para.textContent = message;
}

function playGame(e) { // plays a round at a time
    const playerSelection = this.textContent;
    const computerSelection = computerPlay(); 
    // retrieve current scores
    let playerWins = parseInt(document.querySelector("#playerScore").textContent);
    let comWins = parseInt(document.querySelector("#comScore").textContent);
    const end = endGame(maxScore);
    if (end) {
        return;
    }

    let result = evaluateRound(playerSelection, computerSelection);
    if (result === "draw") {
        // no change in scoreboard textContent
        updateScoreBoard(playerWins, comWins, "It's a draw!");
    } else if (result === "win") {
        // retrieve the current score and add 1 to it
        playerWins++;
        updateScoreBoard(playerWins, comWins, "You won this round!")
        scoreboardEffect(".player");
    } else if (result === "lose") {
        comWins++;
        updateScoreBoard(playerWins, comWins, "You lost this round!");
        scoreboardEffect(".com");
    }
}

function endGame(maxScore) { // 
    const playerWins = parseInt(document.querySelector("#playerScore").textContent);
    const comWins = parseInt(document.querySelector("#comScore").textContent);
    return (playerWins === maxScore || comWins === maxScore) ? true : false;
}

// Click functions
function setupButtons() {
    let buttons = document.querySelectorAll("button");
    buttons.forEach(btn => btn.addEventListener('click', playGame));
    // effects
    buttons.forEach(btn => btn.addEventListener('click', upsizeItem));
    buttons.forEach(btn => btn.addEventListener('transitionend', removeUpsize));
    buttons.forEach(btn => btn.addEventListener('click', playerAnimation));
}

function upsizeItem() {
    this.classList.add("upsize");
}

function removeUpsize() {
    this.classList.remove("upsize");
}
function removeGlow() {
    this.classList.remove("glow");
}

function scoreboardEffect(className) {
    const board = document.querySelector(className);
    board.classList.add("upsize");
    board.classList.add("glow");
    board.addEventListener("transitionend", removeUpsize);
    board.addEventListener("transitionend", removeGlow);
}

function playerAnimation() {
    const end = endGame(maxScore);
    if (end) {
        return;
    }
    const option = this.textContent;
    let playerIcon = document.querySelector("#player-icon");
    // icon animation
    playerIcon.classList.add("upsize");
    playerIcon.addEventListener("transitionend", removeUpsize);

    if (option === "Rock") {
        playerIcon.src = "icons/rock-icon.png";
    } else if (option === "Paper") {
        playerIcon.src = "icons/paper-icon.png";
    } else {
        playerIcon.src = "icons/scissors-icon.png";
    }
}

let maxScore = 5;
setupButtons();

// make the scoreBoard delay/slower