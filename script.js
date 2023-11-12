document.addEventListener('DOMContentLoaded', function () {
    const ruleContainer = document.querySelector('.rule-container');
    const openButton = document.getElementById('openButton');
    const closeButton = document.getElementById('closeButton');
    const pickButtons = document.querySelectorAll('.pick button');
    const pickedSection = document.querySelector('.picked');
    const youPickedSection = document.querySelector('.you .circle');
    const housePickedSection = document.querySelector('.house .circle');
    const playAgainButton = document.querySelector('.play-again');
    const scoreSpans = document.querySelectorAll('.score .count');
    const choicesContainer = document.querySelector('.choices');
    const userChoiceSection = document.querySelector('.user-choice .circle');
    const houseChoiceSection = document.querySelector('.house-choice .circle');
    const resultSection = document.querySelector('.result .circle');

    let scoreIndex = 5; // Index of the initially displayed score

    openButton.addEventListener('click', function () {
        ruleContainer.style.display = 'flex';
    });

    closeButton.addEventListener('click', function () {
        ruleContainer.style.display = 'none';
    });

    pickButtons.forEach(button => {
        button.addEventListener('click', function () {
            document.querySelector('.pick').style.display = 'none';
            pickedSection.style.display = 'flex';

            const buttonId = button.id.toLowerCase();
            youPickedSection.innerHTML = `<img src="/images/icon-${buttonId}.svg" alt="" />`;

            setTimeout(() => {
                const choices = ['PAPER', 'ROCK', 'SCISSORS'];
                const randomChoice = choices[Math.floor(Math.random() * choices.length)];

                housePickedSection.innerHTML = `<img src="/images/icon-${randomChoice}.svg" alt="" />`;

                determineWinner(buttonId.toUpperCase(), randomChoice);
                updateScore();
                updateChoices(buttonId, randomChoice);
            }, 2000);
        });
    });

    playAgainButton.addEventListener('click', function () {
        const winnerSpan = document.getElementById('winner');
        const loserSpan = document.getElementById('loser');
        const drawSpan = document.getElementById('draw');

        winnerSpan.style.display = 'none';
        loserSpan.style.display = 'none';
        drawSpan.style.display = 'none';

        // Reset the UI for the next game
        document.querySelector('.pick').style.display = 'flex';
        pickedSection.style.display = 'none';

        // Clear the previous choices in the UI
        youPickedSection.innerHTML = '';
        housePickedSection.innerHTML = '';

        // Show the choices container
        choicesContainer.style.display = 'flex';

        // Enable the buttons only if the game is not won or lost
        if (scoreIndex !== 0 && scoreIndex !== 10) {
            enableButtons();
        }
    });


    // Function to determine the winner

    // Function to determine the winner
    function determineWinner(playerChoice, houseChoice) {
        const goal = document.querySelector('.goal');
        goal.style.display = 'block';

        const winnerSpan = document.getElementById('winner');
        const loserSpan = document.getElementById('loser');
        const drawSpan = document.getElementById('draw');

        winnerSpan.style.display = 'none';
        loserSpan.style.display = 'none';
        drawSpan.style.display = 'none';

        if (playerChoice === houseChoice) {
            drawSpan.style.display = 'flex';
            updateScore('draw');
        } else if (
            (playerChoice === 'PAPER' && houseChoice === 'ROCK') ||
            (playerChoice === 'ROCK' && houseChoice === 'SCISSORS') ||
            (playerChoice === 'SCISSORS' && houseChoice === 'PAPER')
        ) {
            winnerSpan.style.display = 'flex';
            updateScore('win');
        } else {
            loserSpan.style.display = 'flex';
            updateScore('lose');
        }
    }


    // Function to update the score

    // Function to update the score
    function updateScore(outcome) {
        if (scoreIndex > 0 && scoreIndex < 10) {
            // Increment or decrement the score index based on the outcome
            // Adjust the logic based on your specific win/loss conditions
            // For example, if it's a win, increment; if it's a loss, decrement
            // If it's a draw, don't change the score

            if (outcome === 'win') {
                scoreIndex++;
            } else if (outcome === 'lose') {
                scoreIndex--;
            }

            // Display the corresponding score
            updateScoreDisplay();
        }
    }


    // Function to display the correct score span
    function updateScoreDisplay() {
        // Hide all score spans
        scoreSpans.forEach(span => {
            span.style.display = 'none';
        });

        // Display the span corresponding to the current score index
        scoreSpans[scoreIndex].style.display = 'inline';

        // Check if the game is won or lost
        if (scoreIndex === 0 || scoreIndex === 10) {
            disableButtons();
        }
    }

    // Function to disable pick buttons
    function disableButtons() {
        pickButtons.forEach(button => {
            button.disabled = true;
        });
    }

    // Function to enable pick buttons
    function enableButtons() {
        pickButtons.forEach(button => {
            button.disabled = false;
        });
    }

    // Function to reset the game
    function resetGame() {
        // Clear the previous choices in the UI
        youPickedSection.innerHTML = '';
        housePickedSection.innerHTML = '';

        // Reset the winner, loser, and draw displays
        winnerSpan.style.display = 'none';
        loserSpan.style.display = 'none';
        drawSpan.style.display = 'none';

        // Enable the buttons only if the game is not won or lost
        if (scoreIndex !== 0 && scoreIndex !== 10) {
            enableButtons();
        }

        // Reset the UI for the next game
        pickedSection.style.display = 'none';
    }
});
