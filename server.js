const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/save-name", (req, res) => {
    const name = req.body.name;

    if (!name) {
        return res.status(400).json({ error: "Nom manquant" });
    }

    const line = `${new Date().toISOString()} - ${name}\n`;

    fs.appendFile("names.txt", line, err => {
        if (err) {
            return res.status(500).json({ error: "Erreur serveur" });
        }
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Port : ${PORT}`);
});
