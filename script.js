const API_URL = "/daten.xml";

function loadPackliste() {
    fetch(API_URL)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");
            displayPackliste(xmlDoc);
        })
        .catch(error => console.error("Fehler beim Laden der XML-Datei:", error));
}

function displayPackliste(xmlDoc) {
    const content = document.getElementById("content");
    content.innerHTML = ""; // Inhalt zurücksetzen

    const categories = xmlDoc.getElementsByTagName("kategorie");
    Array.from(categories).forEach(category => {
        const categoryName = category.getAttribute("name");
        const items = category.getElementsByTagName("item");

        const section = document.createElement("div");
        section.classList.add("list");

        const title = document.createElement("h2");
        title.textContent = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        section.appendChild(title);

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

window.onload = loadPackliste;
