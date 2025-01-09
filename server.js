const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.static(".")); // Statische Dateien bereitstellen
app.use(bodyParser.json());

// API: XML lesen
app.get("/daten.xml", (req, res) => {
    fs.readFile("daten.xml", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Fehler beim Lesen der XML-Datei.");
        }
        res.type("application/xml").send(data);
    });
});

// API: XML aktualisieren
app.post("/daten.xml", (req, res) => {
    const xmlContent = req.body.xml;
    fs.writeFile("daten.xml", xmlContent, (err) => {
        if (err) {
            return res.status(500).send("Fehler beim Schreiben der XML-Datei.");
        }
        res.send("XML-Datei erfolgreich aktualisiert.");
    });
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
