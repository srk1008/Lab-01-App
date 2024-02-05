const express = require('express');
const app = express();
app.get('/api/customers', (req, res) => {
    console.log('/api/customers ->>');
    res.json([{ "name": "sharad" }, { "name": "ariha" }]);
});

app.get('/backend/api/customers', (req, res) => {
    console.log('/backend/api/customers ->>');
    res.json([{ "name": "sharad" }, { "name": "ariha" }]);
});

// Listen on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});