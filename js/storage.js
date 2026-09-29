/* =========================================================
   WORDFORGE STORAGE
   Handles player statistics using localStorage
   ========================================================= */


/* ---------------------------------------------------------
   Default statistics
   --------------------------------------------------------- */

const DEFAULT_STATS = {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    bestStreak: 0,
    guessDistribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    }
};


/* ---------------------------------------------------------
   Get statistics
   --------------------------------------------------------- */

function getStats() {

    const savedStats =
        localStorage.getItem("wordforgeStats");


    if (!savedStats) {

        return structuredClone(DEFAULT_STATS);

    }


    return JSON.parse(savedStats);
}


/* ---------------------------------------------------------
   Save statistics
   --------------------------------------------------------- */

function saveStats(stats) {

    localStorage.setItem(
        "wordforgeStats",
        JSON.stringify(stats)
    );

}


/* ---------------------------------------------------------
   Save completed game
   --------------------------------------------------------- */

function saveGameResult(result) {

    const stats = getStats();


    /* Games played */

    stats.gamesPlayed++;


    /* If player won */

    if (result.won) {

        stats.gamesWon++;


        /* Current streak */

        stats.currentStreak++;


        /* Best streak */

        if (
            stats.currentStreak >
            stats.bestStreak
        ) {

            stats.bestStreak =
                stats.currentStreak;

        }


        /* Guess distribution */

        if (
            result.attempts >= 1 &&
            result.attempts <= 6
        ) {

            stats.guessDistribution[
                result.attempts
            ]++;

        }

    } else {

        /* Losing breaks the streak */

        stats.currentStreak = 0;

    }


    saveStats(stats);

}