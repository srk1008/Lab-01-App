const express = require('express');
const app = express();
app.get('/api', (req, res) => {
    res.send('Hello World from API');
});
// Listen on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});