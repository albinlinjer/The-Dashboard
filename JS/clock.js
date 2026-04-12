function updateClock() {
    const now = new Date();

    const time = now.toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const date = now.toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    document.getElementById("clock").textContent = `${time} | ${date}`;
}

updateClock();
setInterval(updateClock, 1000);
