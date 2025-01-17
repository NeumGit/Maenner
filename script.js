const API_URL = "https://sneumann.selfhost.co/daten.xml"; // Ersetze mit deiner Backend-URL

// Funktion, um die XML-Daten vom Backend zu laden
function loadPackliste() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Fehler beim Laden der XML-Daten: " + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            // XML-Daten parsen
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");
            displayPackliste(xmlDoc);
        })
        .catch(error => {
            console.error("Fehler:", error);
            showErrorMessage("Die Packliste konnte nicht geladen werden. Überprüfen Sie die Verbindung.");
        });
}

// Funktion, um die Packliste im HTML anzuzeigen
function displayPackliste(xmlDoc) {
    const categories = xmlDoc.getElementsByTagName("kategorie");
    const content = document.getElementById("content");
    content.innerHTML = ""; // Bestehenden Inhalt leeren

    Array.from(categories).forEach(category => {
        const categoryName = category.getAttribute("name");
        const items = category.getElementsByTagName("item");

        // Kategorie-Container erstellen
        const section = document.createElement("div");
        section.classList.add("category");

        // Kategorie-Titel hinzufügen
        const title = document.createElement("h2");
        title.textContent = categoryName;
        section.appendChild(title);

        // Liste der Items erstellen
        const ul = document.createElement("ul");
        Array.from(items).forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.textContent;
            ul.appendChild(li);
        });

        section.appendChild(ul);
        content.appendChild(section);
    });
}

// Funktion, um eine Fehlermeldung anzuzeigen
function showErrorMessage(message) {
    const content = document.getElementById("content");
    content.innerHTML = `<p class="error">${message}</p>`;
}

// Beim Laden der Seite die Packliste laden
document.addEventListener("DOMContentLoaded", () => {
    loadPackliste();
});
