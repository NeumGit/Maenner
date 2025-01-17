const API_URL = "http://<dein-raspberry-ip>:3000/api/packliste"; // Ersetze <dein-raspberry-ip> mit der IP deines Raspberry Pi

// Packliste vom Backend laden
function loadPackliste() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            displayPackliste(data);
        })
        .catch(error => console.error("Fehler beim Laden der Packliste:", error));
}

// Packliste im Frontend anzeigen
function displayPackliste(data) {
    const content = document.getElementById("content");
    content.innerHTML = ""; // Inhalt zurücksetzen

    for (const category in data) {
        const section = document.createElement("div");
        section.classList.add("list");

        const title = document.createElement("h2");
        title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        section.appendChild(title);

        const ul = document.createElement("ul");
        data[category].forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
        });

        section.appendChild(ul);
        content.appendChild(section);
    }
}

// Packliste beim Laden der Seite laden
window.onload = loadPackliste;
