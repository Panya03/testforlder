const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mime = require('mime-types');
const app = express();
const bfhlRouter = require('./routes/bfhl');

// Configure CORS to allow the frontend URL
const cors = require('cors');

const corsOptions = {
  origin: (origin, callback) => {
    if (origin === 'https://frontend-2j4ra21qh-panyas-projects-1c8cb2da.vercel.app' || origin === 'https://testfolder-bh24ymqup-panyas-projects-1c8cb2da.vercel.app') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
};

app.options('*', cors(corsOptions));  // Preflight request handler


app.use(cors(corsOptions));

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
