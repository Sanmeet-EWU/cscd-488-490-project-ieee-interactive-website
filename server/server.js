/*app.get('/home', (req, res) => {
    db.query('SELECT * FROM EVENTS', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

  app.get('/officers', async (req, res) => {
    try {
      const [officers] = await db.execute('SELECT * FROM officers');
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(officers, null, 2));
    } catch (err) {
      console.error('Error fetching officers:', err);
      res.status(500).json({ error: 'Failed to fetch officers' });
    }
  });

  app.get('/formerofficers', async (req, res) => {
    try {
      const [events] = await db.execute('SELECT * FROM formerofficers');
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(formerofficers, null, 2));
    } catch (err) {
      console.error('Error fetching formerofficers:', err);
      res.status(500).json({ error: 'Failed to fetch formerofficers' });
    }
  });


  app.get('/admin-dashboard', async (req, res) => {
    try {
      const [admin-dashboard] = await db.execute('SELECT * FROM admin-dashboard');
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(admin-dashboard, null, 2));
    } catch (err) {
      console.error('Error fetching admin-dashboard:', err);
      res.status(500).json({ error: 'Failed to fetch admin-dashboard' });
    }
  });*/

// Fetch data from a specified table
/*app.get('/admin-dashboard', async (req, res) => {
  try {
    const [events] = await db.execute('SELECT * FROM EventsDB');
    const [officers] = await db.execute('SELECT * FROM OfficersDB');
    
    res.json({
      events,
      officers
    });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Insert new data into a table
app.post('/admin-dashboard/:table', async (req, res) => {
  const { table } = req.params;
  const data = req.body;
  try {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map(() => '?').join(', ');

    const sql = `INSERT INTO ?? (${columns}) VALUES (${placeholders})`;
    await db.execute(sql, [table, ...values]);

    res.json({ message: 'Data inserted successfully' });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ error: 'Failed to insert data' });
  }
});

// Delete data from a table by ID
app.delete('/admin-dashboard/:table/:id', async (req, res) => {
  const { table, id } = req.params;
  try {
    await db.execute(`DELETE FROM ?? WHERE id = ?`, [table, id]);
    res.json({ message: 'Data deleted successfully' });
  } catch (err) {
    console.error('Error deleting data:', err);
    res.status(500).json({ error: 'Failed to delete data' });
  }
});*/



import express from 'express';
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
const port = 5000;

// Set up body-parser middleware to handle POST data
app.use(bodyParser.json());

// Creates a MySQL connection to EventsDB
const eventsDB = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'PHW#84#jeor',
  database: 'EventsDB',
});

// Creates a MySQL connection to OfficersDB
/*const officersDB = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'PHW#84#jeor',
  database: 'OfficersDB',
});*/

// Connect to both MySQL databases
/*eventsDB.connect((err) => {
  if (err) throw err;
  console.log('Connected to Events Database!');
});

officersDB.connect((err) => {
  if (err) throw err;
  console.log('Connected to Officers Database!');
});*/

// Connect to MySQL for both
try {
  await eventsDB.connect();
  //await officersDB.connect(); //Uncomment when OfficersDB is created
  console.log('Connected to both EventsDB and OfficersDB!');
} catch (err) {
  console.error('Error connecting to MySQL:', err);
}

// Endpoint to handle adding an event
app.post('/add-event', (req, res) => {
  const { title, description, date, time, location, type, registration_url, banner_url } = req.body;

  // SQL query to insert data into the Events table
  const eventQuery = 'INSERT INTO Events (title, description, date, time, location, type, registration_url, banner_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const eventValues = [title, description, date, time, location, type, registration_url, banner_url];

  eventsDB.query(eventQuery, eventValues, (err, result) => {
    if (err) {
      console.error('Error inserting event:', err);
      return res.status(500).json({ error: 'Failed to add event' });
    }
    res.status(200).json({ message: 'Event added successfully', title });
  });
});


  //This event code is to test if the data is being stated as an upcoming or past event
  app.get('/api/events', async (req, res) => {
    try {
      const [events] = await eventsDB.execute('SELECT * FROM Events');
      
      // Get today's date without the time
      const today = new Date().toISOString().split('T')[0];
  
      const categorizedEvents = events.map(event => {
        const eventDate = new Date(event.date).toISOString().split('T')[0];
        return {
          ...event,
          date: new Date(event.date).toISOString().split('T')[0], // Keeps only YYYY-MM-DD
          eventStatus: eventDate >= today ? 'Upcoming' : 'Past'
        };
      });
  
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(categorizedEvents, null, 2));
    } catch (err) {
      console.error('Error fetching events:', err);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });
  
  
  

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

  // Test Events
  /*app.get('/events', async (req, res) => {
    try {
      const [events] = await db.execute('SELECT * FROM Events');
  
      // Convert UTC to local time (adjust as needed)
      const formattedEvents = events.map(event => ({
        ...event,
        date: new Date(event.date).toISOString().split('T')[0], // Keeps only YYYY-MM-DD
      }));
  
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(formattedEvents, null, 2));
    } catch (err) {
      console.error('Error fetching events:', err);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });*/
