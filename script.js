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
        ul.id = `${kategorieName}-list`;
        Array.from(items).forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.textContent}
                <button class="edit-btn" onclick="editItem('${kategorieName}', this)">Bearbeiten</button>
            `;
            ul.appendChild(li);
        });

        listDiv.appendChild(ul);

        // Eingabefeld für neue Items
        const addItemDiv = document.createElement("div");
        addItemDiv.classList.add("add-item");
        addItemDiv.innerHTML = `
            <input type="text" placeholder="Neues Item hinzufügen..." id="${kategorieName}-input">
            <button onclick="addItem('${kategorieName}')">Hinzufügen</button>
        `;
        listDiv.appendChild(addItemDiv);

        container.appendChild(listDiv);
    });
}

// Funktion, um ein neues Item hinzuzufügen
function addItem(category) {
    const input = document.getElementById(`${category}-input`);
    const itemText = input.value.trim();

    if (itemText) {
        const ul = document.getElementById(`${category}-list`);
        const li = document.createElement("li");
        li.innerHTML = `
            ${itemText}
            <button class="edit-btn" onclick="editItem('${category}', this)">Bearbeiten</button>
        `;
        ul.appendChild(li);
        input.value = ""; // Eingabefeld leeren
    }
}

// Funktion, um ein Item zu bearbeiten
function editItem(category, button) {
    const li = button.parentElement;
    const currentText = li.firstChild.textContent.trim();
    const newText = prompt("Bearbeiten:", currentText);

    if (newText && newText.trim() !== "") {
        li.firstChild.textContent = newText.trim();
    }
}

// XML laden, wenn die Seite geladen wird
window.onload = loadXML;
