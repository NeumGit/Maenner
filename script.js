const API_URL = "http://sneumann.selfhost.co:3000/daten.xml"; // Ersetze mit deiner Backend-URL

fetch(API_URL)
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "application/xml");
        displayPackliste(xmlDoc);
    })
    .catch(error => console.error("Fehler beim Laden der XML-Daten:", error));

function displayPackliste(xmlDoc) {
    const categories = xmlDoc.getElementsByTagName("kategorie");
    const content = document.getElementById("content");
    content.innerHTML = "";

    Array.from(categories).forEach(category => {
        const categoryName = category.getAttribute("name");
        const items = category.getElementsByTagName("item");

        const section = document.createElement("div");
        section.classList.add("category");

        const title = document.createElement("h2");
        title.textContent = categoryName;
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
