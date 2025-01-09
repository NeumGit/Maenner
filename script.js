function addItem(section) {
    const input = document.getElementById(`${section}-input`);
    const list = document.getElementById(`${section}-list`);
    const newItem = input.value.trim();

    if (newItem) {
        const li = document.createElement('li');
        li.innerHTML = `${newItem} <button class="edit-btn" onclick="editItem(this)">Bearbeiten</button>`;
        list.appendChild(li);
        input.value = '';
    }
}

function editItem(button) {
    const li = button.parentElement;
    const currentText = li.firstChild.textContent.trim();
    const newText = prompt('Neuen Text eingeben:', currentText);

    if (newText !== null && newText.trim() !== '') {
        li.firstChild.textContent = newText;
    }
}
