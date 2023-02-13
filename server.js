const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());


// routes

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));

})


// api

app.get('/api/notes', (req, res) => {
  const noteData = fs.readFileSync('./db/db.json', "utf-8");
  const notes = JSON.parse(noteData);
  res.json(notes);
})

app.post('/api/notes', (req, res) => {
  const noteData = fs.readFileSync('./db/db.json', "utf-8");
  const notes = JSON.parse(noteData);
  notes.push(req.body);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json('success');
})

app.listen(PORT);

