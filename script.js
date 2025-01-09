// Pfad zur XML-Datei
const XML_URL = "daten.xml";

// Funktion, um die XML-Daten zu laden
function loadXML() {
    fetch(XML_URL)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");
            displayPackliste(xmlDoc);
        })
        .catch(error => console.error("Fehler beim Laden der XML-Datei:", error));
}

// Funktion, um die Packliste anzuzeigen
function displayPackliste(xmlDoc) {
    const container = document.getElementById("content");
    container.innerHTML = ""; // Vorherige Inhalte löschen

    const kategorien = xmlDoc.getElementsByTagName("kategorie");

    Array.from(kategorien).forEach(kategorie => {
        const kategorieName = kategorie.getAttribute("name");
        const items = kategorie.getElementsByTagName("item");

        // Kategorie-Container erstellen
        const listDiv = document.createElement("div");
        listDiv.classList.add("list");

        const title = document.createElement("h2");
        title.textContent = kategorieName.charAt(0).toUpperCase() + kategorieName.slice(1);
        listDiv.appendChild(title);

        // Liste der Items erstellen
        const ul = document.createElement("ul");
        Array.from(items).forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.textContent;
            ul.appendChild(li);
        });

        listDiv.appendChild(ul);
        container.appendChild(listDiv);
    });
}

// XML beim Laden der Seite laden
window.onload = loadXML;
