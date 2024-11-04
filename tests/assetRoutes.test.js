const request = require('supertest');
const app = require('../src/server');
const path = require('path');
const sampleFile = path.join(__dirname, 'assets', 'sample.txt');

describe('Asset Routes', () => {
    let ID = 1; //Default ID
    it('should upload a file', async () => {
        const res = await request(app)
            .post('/api/upload')
            .attach('file', sampleFile);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        ID = res.body.id;
    });

    it('should retrieve all assets', async () => {
        const res = await request(app).get('/api/assets');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should delete an asset by ID', async () => {
        const res = await request(app).delete(`/api/asset/${ID}`);
        expect([200, 404]).toContain(res.statusCode);
    });
});
