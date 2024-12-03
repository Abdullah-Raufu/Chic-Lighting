const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const COUNTER_FILE = './counter.json';

// Enable CORS for frontend access
app.use(cors());

// Route to get and/or increment the visitor count
app.get('/visitor-count', (req, res) => {
  const onlyView = req.query.onlyView === 'true';

  // Read current count from the JSON file
  fs.readFile(COUNTER_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading counter file:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    let count = JSON.parse(data).count;

    if (!onlyView) {
      count++; // Increment the count if not in read-only mode

      // Write updated count back to the file
      fs.writeFile(COUNTER_FILE, JSON.stringify({ count }), (err) => {
        if (err) {
          console.error('Error writing to counter file:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      });
    }

    // Send the current count
    res.json({ count });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
