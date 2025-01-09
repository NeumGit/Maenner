const API_URL = "http://localhost:3000/api/liste";

// Funktion, um die Liste aus dem Server zu laden
function loadList(category) {
    fetch(`${API_URL}/${category}`)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById(`${category}-list`);
            list.innerHTML = "";
            data.items.forEach(item => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    ${item}
                    <button class="edit-btn" onclick="editItem(this, '${category}')">Bearbeiten</button>
                `;
                list.appendChild(listItem);
            });
        })
        .catch(error => console.error("Fehler beim Laden:", error));
}

// Funktion zum Hinzufügen eines neuen Elements
function addItem(category) {
    const input = document.getElementById(`${category}-input`);
    const newItem = input.value.trim();

    if (newItem) {
        fetch(`${API_URL}/${category}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item: newItem })
        })
        .then(() => {
            input.value = "";
            loadList(category);
        })
        .catch(error => console.error("Fehler beim Hinzufügen:", error));
    }
}

// Funktion zum Bearbeiten eines Elements
function editItem(button, category) {
    const listItem = button.parentElement;
    const currentText = listItem.firstChild.textContent.trim();
    const newText = prompt("Bearbeiten:", currentText);

    if (newText !== null && newText.trim() !== "") {
        fetch(`${API_URL}/${category}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ oldItem: currentText, newItem: newText.trim() })
        })
        .then(() => loadList(category))
        .catch(error => console.error("Fehler beim Bearbeiten:", error));
    }
}

// Liste beim Laden der Seite laden
window.onload = () => {
    ["kleidung", "hygiene", "freizeit", "sonstiges"].forEach(loadList);
};
