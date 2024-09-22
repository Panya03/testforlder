
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mime = require('mime-types');
const app = express();
const bfhlRouter = require('./routes/bfhl');
const corsOptions = {
    origin: 'https://frontend-cm6tjc5fc-panyas-projects-1c8cb2da.vercel.app/',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  };
  
  app.use(cors(corsOptions)); 

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
