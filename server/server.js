// Importing necessary modules
const express = require ('express'); // Express framework for server
const app = express (); // Creating an instance of Express
const {Client} = require ('pg'); // PostgreSQL client
const cors = require ('cors'); // CORS handling

// Middleware setup for handling CORS and JSON parsing
app.use (cors ()); // Allow Cross-Origin Resource Sharing
app.use (express.json ()); // Parse incoming JSON requests

// PostgreSQL database configuration
const db = new Client ({
  user: 'postgres',
  host: 'localhost',
  database: 'pcmm_assignment',
  password: 'root',
  port: 5432,
});

// Connecting to the database
db.connect (err => {
  if (err) {
    console.log (err);
    throw err;
  }
  console.log ('Connected to the database!');
});

// Endpoint to fetch all mines
app.get ('/mines', (req, res) => {
  db.query ('SELECT * FROM MINES', (err, result) => {
    if (err) {
      console.log (err);
      res.status (500).send ('Error fetching mines.');
    } else {
      res.json (result.rows); // Transform the rows into JSON and send
    }
  });
});

// Endpoint to fetch a specific contact by ID
app.get ('/contact/:id', (req, res) => {
  const id = req.params.id;

  // SQL query to filter by id
  const sqlQuery = `SELECT * FROM CONTACTS WHERE ID = ${id}`;

  db.query (sqlQuery, (err, result) => {
    if (err) {
      console.log (err);
      res.status (500).send ('An error occurred');
    } else {
      res.json (result.rows); // Transform the rows into JSON and send
    }
  });
});

// Endpoint to fetch production figures for a specific mine ID
app.get ('/production/:id', (req, res) => {
  const id = req.params.id;

  // SQL query to filter by id
  const sqlQuery = `SELECT * FROM PRODUCTION_FIGURES WHERE MINE_ID = ${id}`;

  db.query (sqlQuery, (err, result) => {
    if (err) {
      console.log (err);
      res.status (500).send ('An error occurred');
    } else {
      res.json (result.rows); // Transform the rows into JSON and send
    }
  });
});

// Endpoint to fetch incident counts for a specific mine ID
app.get ('/incidents_count/:id', (req, res) => {
  const id = req.params.id;

  // SQL query to filter by id and aggregate incident counts
  const sqlQuery = `SELECT severity, description, COUNT(*) AS occurrence_count FROM incidents WHERE MINE_ID = ${id} GROUP BY severity, description`;

  db.query (sqlQuery, (err, result) => {
    if (err) {
      console.log (err);
      res.status (500).send ('An error occurred');
    } else {
      res.json (result.rows); // Transform the rows into JSON and send
    }
  });
});

// Endpoint to fetch incidents for a specific mine ID
app.get ('/incidents/:id', (req, res) => {
  const id = req.params.id;

  // SQL query to filter by id
  const sqlQuery = `SELECT * FROM incidents WHERE MINE_ID = ${id}`;

  db.query (sqlQuery, (err, result) => {
    if (err) {
      console.log (err);
      res.status (500).send ('An error occurred');
    } else {
      res.json (result.rows); // Transform the rows into JSON and send
    }
  });
});

// Endpoint to add a new incident
app.post ('/add_incident', (req, res) => {
  const mine_id = req.body.mine_id;
  const description = req.body.description;
  const severity = req.body.severity;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  // SQL query to insert a new incident
  db.query (
    'INSERT INTO incidents (mine_id, description, severity, latitude, longitude) VALUES ($1, $2, $3, $4, $5)',
    [mine_id, description, severity, latitude, longitude],
    (err, result) => {
      if (err) {
        console.log (err);
      } else {
        res.send (result);
      }
    }
  );
});

// Endpoint to delete an incident by ID
app.delete ('/delete_incident/:id', (req, res) => {
  const key = req.params.id;

  // SQL query to delete an incident by ID
  db.query ('DELETE FROM incidents WHERE id = $1', [key], (err, result) => {
    if (err) {
      console.log (err);
    } else {
      res.send (result);
    }
  });
});

// Starting the server on port 3001
app.listen (3001, () => {
  console.log ('Server started successfully on port 3001.');
});
