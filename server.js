const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;
const DATA_FILE = "data.json";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Daten laden oder initialisieren
function loadData() {
    if (!fs.existsSync(DATA_FILE)) {
        return { kleidung: [] };
    }
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// API-Endpunkt: Liste für eine Kategorie abrufen
app.get("/api/liste/:category", (req, res) => {
    const data = loadData();
    const category = req.params.category;
    res.json({ items: data[category] || [] });
});

// API-Endpunkt: Neues Element hinzufügen
app.post("/api/liste/:category", (req, res) => {
    const data = loadData();
    const category = req.params.category;

    if (!data[category]) {
        data[category] = [];
    }

    data[category].push(req.body.item);
    saveData(data);

    res.json({ message: "Item hinzugefügt!" });
});

// API-Endpunkt: Element bearbeiten
app.put("/api/liste/:category", (req, res) => {
    const data = loadData();
    const category = req.params.category;

    if (!data[category]) {
        return res.status(404).json({ message: "Kategorie nicht gefunden!" });
    }

    const index = data[category].indexOf(req.body.oldItem);
    if (index === -1) {
        return res.status(404).json({ message: "Element nicht gefunden!" });
    }

    data[category][index] = req.body.newItem;
    saveData(data);

    res.json({ message: "Element aktualisiert!" });
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
