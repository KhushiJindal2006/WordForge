
// =========================================================
// HOW TO PLAY MODAL
// =========================================================

const howToPlayButton = document.getElementById("how-to-play-button");
const howToPlayModal = document.getElementById("how-to-play-modal");
const closeHowToPlayButton = document.getElementById("close-how-to-play");
const gotItButton = document.getElementById("got-it-button");

function openHowToPlay() {
    if (!howToPlayModal) return;

    howToPlayModal.hidden = false;
    document.body.style.overflow = "hidden";
    closeHowToPlayButton?.focus();
}

function closeHowToPlay() {
    if (!howToPlayModal) return;

    howToPlayModal.hidden = true;
    document.body.style.overflow = "";
    howToPlayButton?.focus();
}

howToPlayButton?.addEventListener("click", openHowToPlay);
closeHowToPlayButton?.addEventListener("click", closeHowToPlay);
gotItButton?.addEventListener("click", closeHowToPlay);

howToPlayModal?.addEventListener("click", function (event) {
    if (event.target === howToPlayModal) {
        closeHowToPlay();
    }
});

document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        howToPlayModal &&
        !howToPlayModal.hidden
    ) {
        closeHowToPlay();
    }
});
