const express = require('express');
const app = express();
app.get('/api', (req, res) => {
    res.send('Hello World from API');
});
// Listen on port 3030
app.listen(3030, () => {
    console.log('Server running on http://localhost:3030');
});