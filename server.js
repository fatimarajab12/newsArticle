const express = require('express');
const port = 8000;
const cors = require('cors');
const app = express();
app.use(cors());
const dotenv = require('dotenv');
const { analyze } = require('./analyze'); // Ensure this is the correct path
dotenv.config();

const MEAN_CLOUD_API_KEY = process.env.API_KEY;

app.use(express.static('dist'));
app.use(express.json());

app.post('/', async (req, res) => {
    const url = req.body.URI;
    const Analyze = await analyze(url, MEAN_CLOUD_API_KEY);
    const { code, msg, sample } = Analyze;
    
    if (code == 212 || code == 100) {
        return res.send({ msg, code });
    }

    return res.send({ sample, code });
});

app.listen(port, () => console.log(`Server is now listening on port ${port}`));
