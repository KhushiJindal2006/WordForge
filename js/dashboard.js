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
    const counts = [];

    for (let attempt = 1; attempt <= 6; attempt++) {
        counts.push(Number(distribution[attempt]) || 0);
    }

    const maxCount = Math.max(...counts, 1);

    for (let attempt = 1; attempt <= 6; attempt++) {
        const element = document.getElementById(`guess-${attempt}`);

        if (!element) continue;

        const count = counts[attempt - 1];
        element.textContent = count;

        const bar = element.closest(".distribution-bar");

        if (!bar) continue;

        // Remove previous highlighting.
        bar.classList.remove("highlight");

        // Keep zero-count bars visible without overflowing.
        bar.style.width = "100%";
        bar.style.minWidth = "0";
        bar.style.flex = "1";

        // Use a child fill to show the proportional count.
        let fill = bar.querySelector(".distribution-fill");

        if (!fill) {
            fill = document.createElement("div");
            fill.className = "distribution-fill";
            bar.prepend(fill);
        }

        fill.style.width = `${(count / maxCount) * 100}%`;
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

            const resultClass = game.won ? "result-won" : "result-lost";

            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${game.mode}</td>
                <td>${game.word}</td>
                
                <td>
                <span class="result-badge ${resultClass}">
                    ${result}
                </span>
                </td>
                
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