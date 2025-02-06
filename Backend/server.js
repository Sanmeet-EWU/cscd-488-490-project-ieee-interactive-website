import express from 'express';
import cors from 'cors';

import eventRoute from './routes/EventRoute.js';
import officerRoute from './routes/OfficerRoute.js';
import utilsRoute from './routes/utilsRoute.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/uploads", express.static('uploads'))

app.use('/', [eventRoute, officerRoute, utilsRoute]);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});