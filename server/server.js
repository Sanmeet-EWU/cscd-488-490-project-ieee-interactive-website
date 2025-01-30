/*import express from 'express';
import mysql from 'mysql';

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '?',
    database: 'EventsDB'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

app.get('/api', (req, res) => {
    res.json({"users": ["user1", "user2", "user3"]})
});

/*app.get('/home', (req, res) => {
    db.query('SELECT * FROM home', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/officers', (req, res) => {
    db.query('SELECT * FROM officers', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/formerofficers', (req, res) => {
    db.query('SELECT * FROM formerofficers', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/events', (req, res) => {
    db.query('SELECT * FROM events', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});*/

/*app.get('/admin-dashboard', (req, res) => {
    db.query('SELECT * FROM events', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(5000, () => {console.log('Server is running on port 5000')});*/



import express from 'express';
//import mysql from 'mysql';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

// Set up body-parser middleware to handle POST data
app.use(bodyParser.json());

// Create a MySQL connection
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '?',
  database: 'EventsDB',
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

// Endpoint to handle adding an event
app.post('/add-event', (req, res) => {
  const { title, description, date, time, location, type, registration_url, banner_url } = req.body;

  // SQL query to insert data into the Events table
  const query = 'INSERT INTO Events (title, description, date, time, location, type, registration_url, banner_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [title, description, date, time, location, type, registration_url, banner_url];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting event:', err);
      return res.status(500).json({ error: 'Failed to add event' });
    }
    res.status(200).json({ message: 'Event added successfully', title });
  });
});

/*app.get('/', (req, res) => {
    res.send('Server is running! 🚀');
  });*/

  app.get('/events', async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT * FROM Events');
      res.json(rows);
    } catch (err) {
      console.error('Error fetching events:', err);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });
  
  

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
