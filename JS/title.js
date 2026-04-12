const titleElement = document.getElementById("title");

// Ladda sparad titel om den finns
const savedTitle = localStorage.getItem("title");
if (savedTitle) {
    titleElement.textContent = savedTitle;
}

// När man klickar på rubriken = gör den redigerbar
titleElement.addEventListener("click", () => {
    titleElement.contentEditable = "true";
    titleElement.focus();
});

// När man slutar redigera (klickar utanför eller trycker Enter) = spara
titleElement.addEventListener("blur", () => {
    titleElement.contentEditable = "false";
    localStorage.setItem("title", titleElement.textContent);
});

// Spara även om man trycker Enter
titleElement.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        titleElement.blur();
    }
});
