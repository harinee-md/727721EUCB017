const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const WINDOW_SIZE = 10;
const THIRD_PARTY_API = {
    primes: "http://20.244.56.144/test/primes",
    fibonacci: "http://20.244.56.144/test/fibo",
    even: "http://20.244.56.144/test/even",
    random: "http://20.244.56.144/test/rand"
};
const QUALIFIED_IDS = ['p', 'f', 'e', 'r'];

let window = [];

app.get('/numbers/:number_id', async (req, res) => {
    const numberId = req.params.number_id;

    if (!QUALIFIED_IDS.includes(numberId)) {
        return res.status(400).json({ error: "Invalid number ID" });
    }

    try {
        const response = await fetchNumbersFromApi(numberId);
        if (!response || !response.numbers) {
            return res.status(500).json({ error: "Failed to fetch numbers from third-party" });
        }

        const newNumbers = response.numbers;
        const windowPrevState = [...window];

        newNumbers.forEach(number => {
            if (!window.includes(number)) {
                if (window.length >= WINDOW_SIZE) {
                    window.shift();
                }
                window.push(number);
            }
        });

        const avg = window.length ? window.reduce((acc, num) => acc + num, 0) / window.length : 0;

        res.json({
            windowPrevState,
            windowCurrState: window,
            numbers: newNumbers,
            avg: parseFloat(avg.toFixed(2))
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

async function fetchNumbersFromApi(numberId) {
    const apiMap = {
        'p': THIRD_PARTY_API.primes,
        'f': THIRD_PARTY_API.fibonacci,
        'e': THIRD_PARTY_API.even,
        'r': THIRD_PARTY_API.random
    };

    try {
        const response = await axios.get(apiMap[numberId], { timeout: 500 });
        return response.data;
    } catch (error) {
        return {};
    }
}

const PORT = 9876;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
