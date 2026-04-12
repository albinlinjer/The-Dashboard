async function getWeather() {
    try {
        // Hämta plats
        const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        // API-url
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max&timezone=auto&forecast_days=3`;

        const response = await fetch(url);
        const data = await response.json();

        const box = document.getElementById("weather-box");
        box.innerHTML = "";

        const dayNames = ["Idag", "Imorgon", "I övermorgon"];

        const icon = (code) => {
            if (code === 0) return "☀️";
            if (code <= 3) return "☁️";
            if (code <= 48) return "🌫️";
            if (code <= 67) return "🌧️";
            if (code <= 77) return "❄️";
            if (code <= 82) return "🌦️";
            if (code <= 99) return "⛈️";
        };

        const text = (code) => {
            if (code === 0) return "Klart";
            if (code <= 3) return "Molnigt";
            if (code <= 48) return "Dimma";
            if (code <= 67) return "Regn";
            if (code <= 77) return "Snö";
            if (code <= 82) return "Skurar";
            if (code <= 99) return "Åska";
        };

        for (let i = 0; i < 3; i++) {
            const code = i === 0 ? data.current.weather_code : data.daily.weather_code[i];
            const temp = i === 0 ? data.current.temperature_2m : data.daily.temperature_2m_max[i];

            const div = document.createElement("div");
            div.textContent = `${dayNames[i]}: ${icon(code)} ${Math.round(temp)}°C – ${text(code)}`;

            box.appendChild(div);
        }

    } catch (err) {
        document.getElementById("weather-box").textContent =
            "Tillåt platsåtkomst för att se vädret.";
    }
}

getWeather();


