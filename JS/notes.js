const notesArea = document.getElementById("notes-area");

// Ladda sparad text
notesArea.value = localStorage.getItem("dashboardNotes") || "";

// Spara automatiskt när användaren skriver
notesArea.addEventListener("input", () => {
    localStorage.setItem("dashboardNotes", notesArea.value);
});
