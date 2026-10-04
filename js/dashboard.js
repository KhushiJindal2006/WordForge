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

displayStats();