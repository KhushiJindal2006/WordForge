/* =========================================================
   WORDFORGE DASHBOARD
   Displays player statistics from localStorage
   ========================================================= */

function displayStats() {
    const stats = getStats();

    const gamesPlayedElement =
        document.getElementById("games-played");

    const gamesWonElement =
        document.getElementById("games-won");

    const winRateElement =
        document.getElementById("win-rate");

    const currentStreakElement =
        document.getElementById("current-streak");

    const bestStreakElement =
        document.getElementById("best-streak");

    gamesPlayedElement.textContent =
        stats.gamesPlayed;

    gamesWonElement.textContent =
        stats.gamesWon;

    currentStreakElement.textContent =
        stats.currentStreak;

    bestStreakElement.textContent =
        stats.bestStreak;

    let winRate = 0;

    if (stats.gamesPlayed > 0) {
        winRate =
            Math.round(
                (stats.gamesWon / stats.gamesPlayed) * 100
            );
    }

    winRateElement.textContent =
        `${winRate}%`;

    displayGuessDistribution(
        stats.guessDistribution
    );
}

function displayGuessDistribution(distribution) {
    for (let attempt = 1; attempt <= 6; attempt++) {
        const element =
            document.getElementById(`guess-${attempt}`);

        element.textContent =
            distribution[attempt];
    }
}

async function displayHistory() {

    const historyList =
        document.getElementById("history-list");

    try {

        const history =
            await getGameHistory();

        historyList.innerHTML = "";

        if (history.length === 0) {

            historyList.innerHTML = `
                <tr>
                    <td colspan="5">
                        No games played yet.
                    </td>
                </tr>
            `;

            return;
        }

        history.reverse().forEach(game => {

            const row =
                document.createElement("tr");

            const date =
                new Date(game.date);

            const formattedDate =
                date.toLocaleDateString();

            const result =
                game.won ? "Won" : "Lost";

            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${game.mode}</td>
                <td>${game.word}</td>
                <td>${result}</td>
                <td>${game.attempts}</td>
                <td>
                <button
                    class="history-delete-button"
                    type="button"
                    data-id="${game.id}"
                >
                    Delete
                </button>
                </td>
            `;

            const deleteButton =
                row.querySelector(
                    ".history-delete-button"
                );

            deleteButton.addEventListener(
                "click",
                () => {
                    handleDeleteHistory(game.id);
                }
            );

            historyList.appendChild(row);
        });

    } catch (error) {

        console.error(
            "Could not load game history:",
            error
        );
    }
}

async function handleDeleteHistory(id) {

    try {

        await deleteGameHistory(id);

        displayHistory();

    } catch (error) {

        console.error(
            "Could not delete game history:",
            error
        );
    }
}

displayStats();

openDatabase()
    .then(() => {
        displayHistory();
    })
    .catch(error => {
        console.error(
            "Could not initialize IndexedDB:",
            error
        );
    });