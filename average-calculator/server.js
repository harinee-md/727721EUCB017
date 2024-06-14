const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const WINDOW_SIZE = 10;
const THIRD_PARTY_API = "http://third-party-server/numbers";
const QUALIFIED_IDS = ['p', 'f', 'e', 'r'];

let window = [];

app.get('/api/numbers/:number_id', async (req, res) => {
    const numberId = req.params.number_id;

    if (!QUALIFIED_IDS.includes(numberId)) {
        return res.status(400).json({ error: "Invalid number ID" });
    }

    try {
        const response = await fetchNumberFromApi(numberId);
        if (!response || !response.number) {
            return res.status(500).json({ error: "Failed to fetch number from third-party" });
        }

        const newNumber = response.number;
        const windowPrevState = [...window];

        if (!window.includes(newNumber)) {
            if (window.length >= WINDOW_SIZE) {
                window.shift();
            }
            window.push(newNumber);
        }

        const avg = window.length ? window.reduce((acc, num) => acc + num, 0) / window.length : 0;

        res.json({
            windowPrevState,
            windowCurrState: window,
            numbers: [newNumber],
            avg: parseFloat(avg.toFixed(2))
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

async function fetchNumberFromApi(numberId) {
    try {
        const response = await axios.get(`${THIRD_PARTY_API}/${numberId}`, { timeout: 500 });
        return response.data;
    } catch (error) {
        return null;
    }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
