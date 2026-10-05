/* =========================================================
   WORDFORGE - GAME ENGINE
   ========================================================= */


/* =========================================================
   GAME CONFIGURATION
   ========================================================= */

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;


/* =========================================================
   GAME STATE
   ========================================================= */

let targetWord = "";

let currentGuess = "";

let currentRow = 0;

let gameOver = false;

let gameMode = "daily";


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const gameBoard = document.getElementById("game-board");

const gameMessage = document.getElementById("game-message");

const keyboardKeys = document.querySelectorAll(".key");

const practiceButton = document.getElementById("practice-button");


/* =========================================================
   START GAME
   ========================================================= */

function startGame(mode = "daily") {

    currentGuess = "";

    currentRow = 0;

    gameOver = false;

    gameMode = mode;


    if (gameMode === "daily") {

        targetWord = getDailyWord();

    } else {

        targetWord = getRandomWord();

    }


    clearBoard();

    resetKeyboard();


    if (gameMode === "daily") {

        showMessage("Today's challenge — good luck!");

    } else {

        showMessage("Practice mode — keep playing!");

    }

}


/* =========================================================
   GET RANDOM WORD
   ========================================================= */

function getRandomWord() {

    const randomIndex =
        Math.floor(Math.random() * WORD_LIST.length);

    return WORD_LIST[randomIndex];
}

/* =========================================================
   DAILY WORD
   ========================================================= */

function getDailyWord() {

    const today = new Date();

    const year = today.getFullYear();

    const month = today.getMonth();

    const day = today.getDate();


    /*
     * Create a simple deterministic number from today's date.
     * The same date will always produce the same number.
     */

    const dateNumber =
        year * 10000 +
        (month + 1) * 100 +
        day;


    const wordIndex =
        dateNumber % WORD_LIST.length;


    return WORD_LIST[wordIndex];

}

/* =========================================================
   CLEAR BOARD
   ========================================================= */

function clearBoard() {

    const tiles =
        document.querySelectorAll(".letter-tile");

    tiles.forEach(tile => {

        tile.textContent = "";

        tile.classList.remove(
            "correct",
            "present",
            "absent"
        );

    });
}


/* =========================================================
   RESET KEYBOARD
   ========================================================= */

function resetKeyboard() {

    keyboardKeys.forEach(key => {

        key.classList.remove(
            "correct",
            "present",
            "absent"
        );

    });
}


/* =========================================================
   SHOW MESSAGE
   ========================================================= */

function showMessage(message) {

    gameMessage.querySelector("p").textContent = message;

}


/* =========================================================
   HANDLE KEY INPUT
   ========================================================= */

function handleKey(key) {

    if (gameOver) {
        return;
    }


    if (key === "ENTER") {

        submitGuess();

        return;
    }


    if (key === "BACKSPACE") {

        removeLetter();

        return;
    }


    if (
        /^[A-Z]$/.test(key) &&
        currentGuess.length < WORD_LENGTH
    ) {

        addLetter(key);

    }

}


/* =========================================================
   ADD LETTER
   ========================================================= */

function addLetter(letter) {

    currentGuess += letter;

    updateCurrentRow();

}


/* =========================================================
   REMOVE LETTER
   ========================================================= */

function removeLetter() {

    if (currentGuess.length === 0) {
        return;
    }

    currentGuess =
        currentGuess.slice(0, -1);

    updateCurrentRow();

}


/* =========================================================
   UPDATE CURRENT ROW
   ========================================================= */

function updateCurrentRow() {

    const rows =
        document.querySelectorAll(".guess-row");

    const currentTiles =
        rows[currentRow].querySelectorAll(".letter-tile");


    currentTiles.forEach((tile, index) => {

        tile.textContent =
            currentGuess[index] || "";

    });

}


/* =========================================================
   SUBMIT GUESS
   ========================================================= */

function submitGuess() {

    if (currentGuess.length !== WORD_LENGTH) {

        showMessage("Word must contain 5 letters.");

        return;
    }


    if (!WORD_LIST.includes(currentGuess)) {

        showMessage("Not in the word list.");

        return;
    }


    // Save the submitted word before clearing currentGuess
    const submittedGuess = currentGuess;


    // Evaluate the submitted word
    const result =
        evaluateGuess(
            submittedGuess,
            targetWord
        );


    // Display the result on the current row
    displayResult(result);


    // Check if the player won
    if (submittedGuess === targetWord) {

        gameOver = true;

        const attempts = currentRow + 1;

        saveGameResult({
            won: true,
            attempts: attempts,
            word: targetWord,
            mode: gameMode
        });

        saveGameHistory({
            date: new Date().toISOString(),
            word: targetWord,
            won: true,
            attempts: attempts,
            mode: gameMode
        });

        showMessage(
            `You won in ${attempts} attempts!`
        );

        return;
    }


    // Move to the next row
    currentRow++;


    // Clear input for the NEXT guess
    currentGuess = "";


    // Check if all attempts are used
    if (currentRow >= MAX_ATTEMPTS) {

        gameOver = true;

        saveGameResult({
            won: false,
            attempts: MAX_ATTEMPTS,
            word: targetWord,
            mode: gameMode
        });

        saveGameHistory({
            date: new Date().toISOString(),
            word: targetWord,
            won: false,
            attempts: MAX_ATTEMPTS,
            mode: gameMode
        });

        showMessage(
            `Game over! The word was ${targetWord}.`
        );

        return;
    }


    showMessage("Keep going!");

}

/* =========================================================
   EVALUATE GUESS
   ========================================================= */

function evaluateGuess(guess, target) {

    const result =
        Array(WORD_LENGTH).fill("absent");


    const remainingLetters =
        target.split("");


    /*
     * PASS 1
     *
     * Find exact matches first.
     */

    for (let i = 0; i < WORD_LENGTH; i++) {

        if (guess[i] === target[i]) {

            result[i] = "correct";

            remainingLetters[i] = null;

        }

    }


    /*
     * PASS 2
     *
     * Find letters that exist in another position.
     */

    for (let i = 0; i < WORD_LENGTH; i++) {

        if (result[i] === "correct") {
            continue;
        }


        const letterIndex =
            remainingLetters.indexOf(
                guess[i]
            );


        if (letterIndex !== -1) {

            result[i] = "present";

            remainingLetters[letterIndex] = null;

        }

    }


    return result;

}


/* =========================================================
   DISPLAY RESULT
   ========================================================= */

function displayResult(result) {

    const rows =
        document.querySelectorAll(".guess-row");


    const currentTiles =
        rows[currentRow].querySelectorAll(".letter-tile");


    for (let i = 0; i < WORD_LENGTH; i++) {

        currentTiles[i]
            .classList
            .add(result[i]);

    }


    updateKeyboard(result);

}


/* =========================================================
   UPDATE KEYBOARD
   ========================================================= */

function updateKeyboard(result) {

    const currentLetters =
        currentGuess.split("");


    currentLetters.forEach((letter, index) => {

        const key =
            document.querySelector(
                `.key[data-key="${letter}"]`
            );


        if (!key) {
            return;
        }


        const status = result[index];


        /*
         * Correct has highest priority.
         */

        if (status === "correct") {

            key.classList.remove(
                "present",
                "absent"
            );

            key.classList.add("correct");

            return;
        }


        /*
         * Present is better than absent.
         */

        if (
            status === "present" &&
            !key.classList.contains("correct")
        ) {

            key.classList.remove("absent");

            key.classList.add("present");

            return;
        }


        /*
         * Only mark absent if the key has
         * no better status.
         */

        if (
            status === "absent" &&
            !key.classList.contains("correct") &&
            !key.classList.contains("present")
        ) {

            key.classList.add("absent");

        }

    });

}


/* =========================================================
   KEYBOARD CLICK EVENTS
   ========================================================= */

keyboardKeys.forEach(key => {

    key.addEventListener("click", () => {

        const value =
            key.dataset.key;

        handleKey(value);

    });

});


/* =========================================================
   PHYSICAL KEYBOARD EVENTS
   ========================================================= */
   
document.addEventListener("keydown", event => {
    const key = event.key.toUpperCase();

    if (key === "ENTER") {
        event.preventDefault();
        handleKey("ENTER");
        return;
    }

    if (key === "BACKSPACE") {
        event.preventDefault();
        handleKey("BACKSPACE");
        return;
    }

    if (/^[A-Z]$/.test(key)) {
        handleKey(key);
    }
});


/* =========================================================
   PRACTICE MODE
   ========================================================= */

practiceButton.addEventListener(
    "click",
    () => {
        startGame("practice");
    }
)


/* =========================================================
   START APPLICATION
   ========================================================= */

startGame();