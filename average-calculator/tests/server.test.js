// backend/tests/server.test.js
const request = require('supertest');
const app = require('../src/server');

describe('Average Calculator API', () => {
    it('should handle even numbers', async () => {
        const response1 = await request(app).get('/numbers/e');
        expect(response1.status).toBe(200);
        expect(response1.body.windowCurrState.length).toBeGreaterThan(0);
        expect(response1.body.avg).toBeGreaterThan(0);

        const response2 = await request(app).get('/numbers/e');
        expect(response2.status).toBe(200);
        expect(response2.body.windowCurrState.length).toBeGreaterThanOrEqual(10);
        expect(response2.body.avg).toBeGreaterThan(0);
    });

    it('should handle prime numbers', async () => {
        const response = await request(app).get('/numbers/p');
        expect(response.status).toBe(200);
        expect(response.body.windowCurrState.length).toBeGreaterThan(0);
        expect(response.body.avg).toBeGreaterThan(0);
    });

    it('should handle fibonacci numbers', async () => {
        const response = await request(app).get('/numbers/f');
        expect(response.status).toBe(200);
        expect(response.body.windowCurrState.length).toBeGreaterThan(0);
        expect(response.body.avg).toBeGreaterThan(0);
    });

    it('should handle random numbers', async () => {
        const response = await request(app).get('/numbers/r');
        expect(response.status).toBe(200);
        expect(response.body.windowCurrState.length).toBeGreaterThan(0);
        expect(response.body.avg).toBeGreaterThan(0);
    });
});
