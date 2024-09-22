
const express = require('express');
const bodyParser = require('body-parser');
const mime = require('mime-types');
const app = express();


app.use(bodyParser.json({ limit: '10mb' })); 


const bfhlRouter = require('./routes/bfhl');
app.use('/bfhl', bfhlRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ is_success: false, message: 'Internal Server Error' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
