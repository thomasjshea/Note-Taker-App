// Installing express package
const express = require('express')
const path = require('path')
// import the db.json package
const db = require('./db/db.json')
const PORT = 3001;

const app = express();

app.get('/', (req, res) => res.sendFile(path.join(__dirname,'/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname,'/public/notes.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname,'/public/index.html')));

app.listen(PORT, () => console.log(`Express Server listening at http://localhost:${PORT}`));

