function addItem(category) {
    const input = document.getElementById(`${category}-input`);
    const list = document.getElementById(`${category}-list`);

    if (!input.value.trim()) {
        alert("Bitte etwas eingeben!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = input.value;
    list.appendChild(li);
    input.value = "";

    saveNewItem(category, li.textContent);
}

function saveNewItem(category, item) {
    fetch("https://sneumann.selfhost.co/save-item", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ category, item })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Fehler beim Speichern der Daten.");
        }
        alert("Element erfolgreich gespeichert!");
    })
    .catch(error => {
        console.error("Fehler:", error);
    });
}
