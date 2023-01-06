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









app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);