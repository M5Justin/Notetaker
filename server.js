const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Get route for homepage
app.get('/', (rec, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

//Function to write data to the JSON file given a destination and some content

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// Function to read data from a given a file and append some content

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };

  // GET Route for retrieving all the notes
app.get('/db/db', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  
  // POST Route for a new note
  app.post('/db/db', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });

 // GET Route for retrieving notes
app.get('/db/db', (req, res) => {
    console.info(`${req.method} request received for notes`);
  
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  
  // POST Route for submitting notes
  app.post('/db/db', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to submit notes`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting notes');
    }
  });
   




// Port Listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);