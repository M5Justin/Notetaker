const express = require('express');
const port = process.env.PORT || 3001;
const app = express();

app.get('/', (rec, res) => {
    res.send('Hello class');
});

app.listen(PORT);