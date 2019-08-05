const game = () => {
    let pScore = 0;
    let cScore = 0;
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    const winningScore = 5;


    const startGame = () => {
        const playBtn = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");
        const match = document.querySelector(".match");

        playBtn.addEventListener("click", () => {
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");
        });
    };

    //Play match
    const playMatch = () => {
        const options = document.querySelectorAll(".options button");
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const hands = document.querySelectorAll(".hands img");

        hands.forEach(hand => {
            hand.addEventListener("animationend", function(){
                this.style.animation = "";
            })
        })
        //Computer Options
        const computerOptions = ["rock", "paper", "scissors"];

        options.forEach(options => {
            options.addEventListener("click", function() {
                //Computer Choice
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];
                
                
                setTimeout(() => {
                     //Here is where we call compare hands
                    compareHands(this.textContent, computerChoice);
                    //Update Images
                    playerHand.src =`./assets/${this.textContent}.png`;
                    computerHand.src = `./assets/${computerChoice}.png`;
                }, 2000)

                //Animation
                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";
            });
        });
    }; //playmatch closed

    const updateScore = () => {
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };

    const compareHands = (playerChoice, computerChoice) => {
        //update Text
        let winner = document.querySelector(".winner");
        if(playerChoice === computerChoice) {
            winner.textContent = "It\'s a tie";
            return;
        }
        if(playerChoice === "rock") {
            if(computerChoice === "scissors") {
                winner.textContent = "You win!"
                pScore++
                updateScore();
                checkForWinner();
                return;
            } else {
                winner.textContent = "Computer wins";
                cScore++
                updateScore();
                checkForWinner();
                return;
            }
        }
        if (playerChoice === "paper") {
            if (computerChoice === "scissors") {
                    winner.textContent = "Computer wins"
                    cScore++
                    updateScore();
                    checkForWinner();
                    return;
            } else {
                winner.textContent = "You win!";
                pScore++
                updateScore();
                checkForWinner();
                return;
            }
        }
        if (playerChoice === "scissors") {
            if (computerChoice === "rock") {
                    winner.textContent = "Computer wins"
                    cScore++
                    updateScore();
                    checkForWinner();
                    return;
            } else {
                winner.textContent = "You win!";
                pScore++
                updateScore();
                checkForWinner();
                return;
            }
        }
    };
    
    function checkForWinner () {
        if(pScore === winningScore) {
            finalResult = "You win";
            endGame ();
        } else if (cScore === winningScore) {
            finalResult = "Computer wins";
            endGame();
        }
    };


    function endGame() {
        let winner = document.querySelector(".winner");
        options = document.querySelectorAll(".options button");
        if (finalResult == "You win") {
            winner.textContent = "Game over. You won the game!";
        } else winner.textContent = "Game over. You lost the game!";
        
    
        setChoiceButtonsOff(); // prevent user from making more plays after game ends
        let resetButton = document.createElement("button");
        resetButton.textContent = "Play again?";
        resetButton.style.position = "absolute";
        resetButton.style.top = "10em";
        resetButton.style.right = "14em";
        resetButton.addEventListener("click", () => resetGame());

        winner.appendChild(resetButton);
    };
        
    function resetGame(){
        pScore = 0;
        cScore = 0;
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
        setChoiceButtonsOn();
        startGame();
    };
    
    function setChoiceButtonsOff() {
        options.forEach(option => {
            option.setAttribute("disabled", "true");
            option.classList.add("faded");
        });
    }  

    function setChoiceButtonsOn(){
        options.forEach(option => {
                option.removeAttribute("disabled");
                option.classList.remove("faded");
            });
    };
 
    

    //call all the inner functions
    startGame();
    playMatch();
    checkForWinner();
  


};


//start the game function
game();

