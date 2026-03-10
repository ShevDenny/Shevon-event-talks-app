const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get all talks
app.get('/api/talks', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'talks.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading talks.json:', err);
      return res.status(500).json({ error: 'Failed to read talk data' });
    }
    res.json(JSON.parse(data));
  });
});

// For any other route, serve index.html
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
