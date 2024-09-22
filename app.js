const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mime = require('mime-types');
const app = express();
const bfhlRouter = require('./routes/bfhl');

// Configure CORS to allow the frontend URL
const corsOptions = {
  origin: 'https://frontend-cm6tjc5fc-panyas-projects-1c8cb2da.vercel.app', // No trailing slash
  methods: ['GET', 'POST', 'OPTIONS'], // Include 'OPTIONS' for preflight
  allowedHeaders: ['Content-Type'],  // What headers are allowed
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions)); // Apply the CORS middleware

app.use(bodyParser.json({ limit: '10mb' })); 

app.get('/', (req, res) => {
  res.send('Welcome to the BFHL API!');
});

app.use('/bfhl', bfhlRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ is_success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
