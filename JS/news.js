async function getNews() {
    const url = "https://rss.aftonbladet.se/rss2/small/pages/sections/sportbladet/";

    try {
        const response = await fetch(url);
        const text = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        const items = xml.querySelectorAll("item");

        const box = document.getElementById("news-box");
        box.innerHTML = "";

        items.forEach((item, index) => {
            if (index >= 4) return;

            const title = item.querySelector("title").textContent;
            const link = item.querySelector("link").textContent;

            const div = document.createElement("div");
            div.classList.add("news-item");

            div.innerHTML = `
                <div class="news-title">${title}</div>
            `;

            div.addEventListener("click", () => {
                window.open(link, "_blank");
            });

            box.appendChild(div);
        });

    } catch (err) {
        document.getElementById("news-box").textContent =
            "Kunde inte hämta nyheter från Aftonbladet.";
    }
}

getNews();