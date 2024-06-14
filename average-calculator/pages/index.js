import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [numberId, setNumberId] = useState('p');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/numbers/${numberId}`);
            setData(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch data');
            setData(null);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Average Calculator</h1>
            <select value={numberId} onChange={(e) => setNumberId(e.target.value)}>
                <option value="p">Prime</option>
                <option value="f">Fibonacci</option>
                <option value="e">Even</option>
                <option value="r">Random</option>
            </select>
            <button onClick={fetchData}>Fetch Number</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && (
                <div>
                    <h2>Response</h2>
                    <p><strong>Previous State:</strong> {JSON.stringify(data.windowPrevState)}</p>
                    <p><strong>Current State:</strong> {JSON.stringify(data.windowCurrState)}</p>
                    <p><strong>Numbers:</strong> {JSON.stringify(data.numbers)}</p>
                    <p><strong>Average:</strong> {data.avg}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
