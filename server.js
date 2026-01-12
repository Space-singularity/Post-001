const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/save-name", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Nom manquant" });
    }

    const entry = `${new Date().toISOString()} - ${name}`;


    fs.appendFile("names.txt", entry + "\n", () => {});

    
    console.log("Nouvel interssé ! :", entry);

    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log("Port : ", PORT);
});
