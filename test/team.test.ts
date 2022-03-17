import request from 'supertest'
import app from '../app'

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjI5YTY5NTkyMDgwMDQ1NjAyODFiYjMiLCJpYXQiOjE2NDY5ODIzNDh9.nlbIg4xktl3ygHdQ7WzUFUVzvRkVR0K9wBo22ERfoaA';
const data = {
    team_name: 'Aletico Madrid',
    logo: 'image',
    player_list: '123'
}
const teamId = '6231a8f2f50d97c2bcfac9a6';
const dataUpdate = {
    team_name: 'Chelsea',
    logo: 'image',
    player_list: '123'
}
const playerId: string = '516362738';

describe('Test Team API', () => {
    test('Unauthorized - response status code 403 and message', async () => {
        const res = await request(app)
            .post('/api/team')
            .send(data)

        expect(res.status).toBe(403);
        expect(res.body.message).toEqual('Unauthorized');
    })

    describe('Test create new team api', () => {
        test('Exist - response status code 404 and message', async () => {
            const res = await request(app)
                .post('/api/team')
                .set('Authorization', token)
                .send({
                    team_name: 'Barcelona',
                    logo: 'image',
                    player_list: '123'
                })
    
            expect(res.status).toBe(400);
            expect(res.body.message).toEqual('Team name has already existed');
        })

        test('All good - response status code 200 and message', async () => {
            const res = await request(app)
                .post('/api/team')
                .set('Authorization', token)
                .send(data)
    
            expect(res.status).toBe(200);
            expect(res.body.message).toEqual('New team has been created successfully!');
        })
    })

    describe('Test get single team api', () => {
        test('All good - response status code 200 and message', async () => {
            const res = await request(app)
                .get(`/api/team/${teamId}`)
                .set('Authorization', token)
    
            expect(res.status).toBe(200);
            expect(res.body.message).toEqual('Fetched team information successfully!');
        })

        test('Not Found - response status code 404 and message', async () => {
            const res = await request(app)
                .get(`/api/team/622afae0bd713d1d149ead05`)
                .set('Authorization', token)
    
            expect(res.status).toBe(404);
            expect(res.body.message).toEqual('Not Found');
        })
    })

    describe('Test get all team api', () => {
        test('All good - response status code 200 and message', async () => {
            const res = await request(app)
                .get('/api/team')
                .set('Authorization', token)
    
            expect(res.status).toBe(200);
            expect(res.body.message).toEqual('Fetched all team information successfully!');
        })
    })

    describe('Test update team api', () => {
        test('All good - response status code 200 and message', async () => {
            const res = await request(app)
                .put(`/api/team/${teamId}`)
                .set('Authorization', token)
                .send(dataUpdate)
    
            expect(res.status).toBe(200);
            expect(res.body.message).toEqual('Updated team information successfully!');
        })

        test('Not Found - response status code 404 and message', async () => {
            const res = await request(app)
                .put(`/api/team/622afae0bd713d1d149ead05`)
                .set('Authorization', token)
    
            expect(res.status).toBe(404);
            expect(res.body.message).toEqual('Not Found');
        })
    })

    describe('Test delete team api', () => {
        test('All good - response status code 200 and message', async () => {
            const res = await request(app)
                .delete(`/api/team/${teamId}`)
                .set('Authorization', token)
    
            expect(res.status).toBe(200);
            expect(res.body.message).toEqual('Deleted team successfully!');
        })

        test('Not Found - response status code 404 and message', async () => {
            const res = await request(app)
                .delete(`/api/team/622afae0bd713d1d149ead05`)
                .set('Authorization', token)
    
            expect(res.status).toBe(404);
            expect(res.body.message).toEqual('Not Found');
        })
    })

    describe('Test add player to team api', () => {
        test('Exist - response status code 404 and message', async () => {
            const res = await request(app)
                .post(`/api/team/${teamId}/addPlayer`)
                .set('Authorization', token)
                .send('622eca5b3e17d9162c799914')
    
            expect(res.status).toBe(400);
            expect(res.body.message).toEqual('The player already exist in the team');
        })

        test('All good - response status code 200 and message', async () => {
            const res = await request(app)
                .post(`/api/team/${teamId}/addPlayer`)
                .set('Authorization', token)
                .send(playerId)
    
            expect(res.status).toBe(200);
            expect(res.body.message).toEqual('Added player to team successfully!');
        })

        test('Not Found - response status code 404 and message', async () => {
            const res = await request(app)
                .post(`/api/team/622afae0bd713d1d149ead05/addPlayer`)
                .set('Authorization', token)
    
            expect(res.status).toBe(404);
            expect(res.body.message).toEqual('Not Found');
        })
    })

    describe('Test delete player from team api', () => {
        test('All good - response status code 200 and message', async () => {
            const res = await request(app)
                .post(`/api/team/${teamId}/deletePlayer`)
                .set('Authorization', token)
                .send(playerId)
    
            expect(res.status).toBe(200);
            expect(res.body.message).toEqual('Deleted player from team successfully!');
        })

        test('Not Found - response status code 404 and message', async () => {
            const res = await request(app)
                .post(`/api/team/622afae0bd713d1d149ead05/deletePlayer`)
                .set('Authorization', token)
    
            expect(res.status).toBe(404);
            expect(res.body.message).toEqual('Not Found');
        })
    })
})