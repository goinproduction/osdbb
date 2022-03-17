import request from 'supertest'
import app from '../app'

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjI5YTY5NTkyMDgwMDQ1NjAyODFiYjMiLCJpYXQiOjE2NDY5ODIzNDh9.nlbIg4xktl3ygHdQ7WzUFUVzvRkVR0K9wBo22ERfoaA';
const data = {
    player_name: 'Gavi',
    player_number: 30,
    player_avatar: 'image',
    player_position: 'Midfielder'
}
const playerId = '622eca5b3e17d9162c799916';
const dataUpdate = {
    player_name: 'Pedro González López',
    player_number: 16,
    player_avatar: 'image',
    player_position: 'Midfielder'
}

describe('Test Player API', () => {
    test('Unauthorized - response status code 403 and message', async () => {
        const res = await request(app)
            .get('/api/player')

        expect(res.status).toBe(403);
        expect(res.body.message).toEqual('Unauthorized');
    })

    describe('Test create player api', () => {
        test('Exist - response status code 404 and message', async () => {
            const res = await request(app)
                .post('/api/player')
                .set('Authorization', token)
                .send({
                    player_name: 'Pedri',
                    player_number: 16,
                    player_avatar: 'image',
                    player_position: 'Midfielder'
                })
    
            expect(res.status).toBe(400);
            expect(res.body.message).toEqual("Player's name or Player's number has already existed");
        })

        test('All good - response status code 200 and message', async () => {
            const res = await request(app)
                .post('/api/player')
                .set('Authorization', token)
                .send(data)
    
            expect(res.status).toBe(200);
            expect(res.body.message).toEqual('New Player has been created successfully!');
        })
    })

    describe('Test get single team api', () => {
        test('All good - response status code 200 and message', async () => {
            const res = await request(app)
                .get(`/api/player/${playerId}`)
                .set('Authorization', token)
    
            expect(res.status).toBe(200);
            expect(res.body.message).toEqual('Fetched player information successfully!');
        })

        test('Not Found - response status code 404 and message', async () => {
            const res = await request(app)
                .get(`/api/player/622afae0bd713d1d149ead05`)
                .set('Authorization', token)
    
            expect(res.status).toBe(404);
            expect(res.body.message).toEqual('Not Found');
        })
    })

    describe('Test get all team api', () => {
        test('All good - response status code 200 and message', async () => {
            const res = await request(app)
                .get('/api/player')
                .set('Authorization', token)
    
            expect(res.status).toBe(200);
            expect(res.body.message).toEqual('Fetched all player information successfully!');
        })
    })

    describe('Test update team api', () => {
        test('All good - response status code 200 and message', async () => {
            const res = await request(app)
                .put(`/api/player/${playerId}`)
                .set('Authorization', token)
                .send(dataUpdate)
    
            expect(res.status).toBe(200);
            expect(res.body.message).toEqual('Updated player information successfully!');
        })

        test('Not Found - response status code 404 and message', async () => {
            const res = await request(app)
                .put(`/api/player/622afae0bd713d1d149ead05`)
                .set('Authorization', token)
    
            expect(res.status).toBe(404);
            expect(res.body.message).toEqual('Not Found');
        })
    })

    describe('Test delete team api', () => {
        test('All good - response status code 200 and message', async () => {
            const res = await request(app)
                .delete(`/api/player/${playerId}`)
                .set('Authorization', token)
    
            expect(res.status).toBe(200);
            expect(res.body.message).toEqual('Deleted player successfully!');
        })

        test('Not Found - response status code 404 and message', async () => {
            const res = await request(app)
                .delete(`/api/player/622afae0bd713d1d149ead05`)
                .set('Authorization', token)
    
            expect(res.status).toBe(404);
            expect(res.body.message).toEqual('Not Found');
        })
    })
})