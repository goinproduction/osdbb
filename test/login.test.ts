import request from 'supertest'
import app from '../app'

const data = {
    "username": "A Nguyễn",
    "full_name": "Nguyễn Văn A",
    "email": "a@gmail.com",
    "avatar": "image"
}
describe('Test Login', () => {
    describe('Test Login with Google', () => {
        test('Invalid Format - response status code 400 and message', async () => {
            const res = await request(app)
                .post(`/api/auth/loginGoogle`)
                .send({
                    "username": "A Nguyễn",
                    "full_name": "Nguyễn Văn A",
                    "email": "a@gmail.com"
                })
    
            expect(res.status).toBe(400);
            expect(res.body.message).toEqual('Invalid format, please try again');
        })

        test('Exist - response status code 200 and message', async () => {
            const res = await request(app)
                .post(`/api/auth/loginGoogle`)
                .send(data)
    
            expect(res.status).toBe(200);
            expect(res.body.message).toEqual('User has been logged in successfully');
        })

        test('All good - response status code 200 and message', async () => {
            const res = await request(app)
                .post(`/api/auth/loginGoogle`)
                .send(data)
    
            expect(res.status).toBe(200);
            expect(res.body.message).toEqual('Account has been created successfully!');
        })
    })
})