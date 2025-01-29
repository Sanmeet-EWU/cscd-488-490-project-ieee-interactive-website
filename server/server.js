import express from 'express';
import mysql from 'mysql';

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
});

/*db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});*/

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
});*/

app.listen(5000, () => {console.log('Server is running on port 5000')});