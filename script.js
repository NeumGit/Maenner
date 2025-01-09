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

// Funktion, um ein neues Element hinzuzufügen
function addItem(category) {
    const input = document.getElementById(`${category}-input`);
    const itemText = input.value.trim();

    if (itemText) {
        fetch(`${API_URL}/${category}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item: itemText })
        })
        .then(() => {
            loadList(category); // Liste neu laden
            input.value = "";
        })
        .catch(error => console.error("Fehler beim Hinzufügen:", error));
    }
}

// Funktion, um ein Element zu bearbeiten
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
        .then(() => loadList(category)) // Liste neu laden
        .catch(error => console.error("Fehler beim Bearbeiten:", error));
    }
}

// Beim Laden der Seite die Liste laden
window.onload = () => {
    loadList("kleidung");
};
