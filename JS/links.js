const linkList = document.getElementById("link-list");
const showAddRowBtn = document.getElementById("show-add-row");

let links = JSON.parse(localStorage.getItem("dashboardLinks")) || [];

// Visa sparade länkar
function renderLinks() {
    linkList.innerHTML = "";

    links.forEach((link, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <a href="${link.url}" target="_blank">${link.title}</a>
            <span class="delete-btn" data-index="${index}">-</span>
        `;

        linkList.appendChild(li);
    });
}

// Skapa en ny rad för att lägga till länk
function showAddRow() {

    if (document.querySelector(".new-link-row")) return;

    const row = document.createElement("div");
    row.className = "new-link-row";

    row.innerHTML = `
        <input type="text" id="new-title" placeholder="Rubrik">
        <input type="text" id="new-url" placeholder="https://exempel.se">
        <button class="save-btn">Spara</button>
    `;

    linkList.appendChild(row);

    // När man klickar på Spara
    row.querySelector(".save-btn").addEventListener("click", saveNewLink);
}

// Spara ny länk
function saveNewLink() {
    const title = document.getElementById("new-title").value.trim();
    const url = document.getElementById("new-url").value.trim();

    if (title === "" || url === "") return;

    links.push({ title, url });
    localStorage.setItem("dashboardLinks", JSON.stringify(links));

    renderLinks();
}

// Ta bort länk
linkList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.dataset.index;
        links.splice(index, 1);
        localStorage.setItem("dashboardLinks", JSON.stringify(links));
        renderLinks();
    }
});

// Klick på knappen = visa rad
showAddRowBtn.addEventListener("click", showAddRow);

// Visa länkar vid start
renderLinks();
