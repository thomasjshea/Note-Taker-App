// import required packages
const express = require('express')
const fs = require('fs');
const path = require('path')
const { v4: uuidv4 } = require('uuid')

// import the db.json package
const notes = require('./db/db.json')
const PORT = 3001;

// Initialize the app variable
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// set the route for the homepage to the index.html file and the for the /notes to the notes.html file
app.get('/', (req, res) => res.sendFile(path.join(__dirname,'/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname,'/public/notes.html')));


// sets the route to get the data from the db.json file
app.get('/api/notes', (req, res) => res.json(notes));

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    
    const { title, text } = req.body

    if(title && text) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if(err) {
                console.error(err);
            }
            else {
                const parsedNotes = JSON.parse(data)
                parsedNotes.push(newNote)

                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 3), (err) => {
                    err ? console.error(err) : console.log (`New Note for ${newNote.title} has been written to the JSON file`)
                })
            }
        })
    }
})

// if the user tries to naviage to a route that doesn't exist will direct them back to the homepage
app.get('*', (req, res) => res.sendFile(path.join(__dirname,'/public/index.html')));



// listens for connections
app.listen(PORT, () => console.log(`Express Server listening at http://localhost:${PORT}`));

