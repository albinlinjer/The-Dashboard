const UNSPLASH_KEY = "iiXPmhkWPyhJ3gzq2KSm-bV9krXVctlDr7Vi78lvNg4";

async function changeBackground() {
    const btn = document.getElementById("change-bg-btn");

    const url = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_KEY}&query=nature,wallpapers&orientation=landscape`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data || !data.urls || !data.urls.regular) {
            throw new Error("API-svar saknar bild-URL");
        }

        const imageUrl = data.urls.regular;

        // Sätt bakgrund
        document.body.style.backgroundImage = `url('${imageUrl}')`;

        // Spara i LocalStorage
        localStorage.setItem("dashboardBackground", imageUrl);

    } catch (error) {
        console.error("Kunde inte hämta bild:", error);

        // Fallback-bild
        document.body.style.backgroundImage = "url('img/fallback.jpg')";
    } finally {
        btn.textContent = "Slumpa ny bakgrund";
    }
}

// Ladda sparad bakgrund vid start
function loadSavedBackground() {
    const saved = localStorage.getItem("dashboardBackground");
    if (saved) {
        document.body.style.backgroundImage = `url('${saved}')`;
    } else {
        changeBackground();
    }
}

loadSavedBackground();

document
    .getElementById("change-bg-btn")
    .addEventListener("click", changeBackground);
