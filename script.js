// Funktion zum Hinzufügen eines neuen Elements zur Liste
function addItem(category) {
    const input = document.getElementById(`${category}-input`);
    const list = document.getElementById(`${category}-list`);

    if (input.value.trim() !== "") {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${input.value.trim()}
            <button class="edit-btn" onclick="editItem(this)">Bearbeiten</button>
        `;
        list.appendChild(listItem);
        input.value = "";
    }
}

// Funktion zum Bearbeiten eines bestehenden Listenelements
function editItem(button) {
    const listItem = button.parentElement;
    const currentText = listItem.firstChild.textContent.trim();
    const newText = prompt("Bearbeiten:", currentText);

    if (newText !== null && newText.trim() !== "") {
        listItem.firstChild.textContent = newText.trim();
    }
}
