import supertest from 'supertest';
import app from './../app';
import prisma from '../lib/databases/prisma';
import userFactory from './factories/userFactory';
import usersRepository from '../lib/repositories/usersRepository';

const agent = supertest(app);

beforeAll(async () => prisma.$executeRaw`TRUNCATE TABLE users CASCADE`);

describe('Users Routes', ()=>{

    const userData = userFactory();

    test('should create a new user with valid fields, and return 201 status code', async ()=>{

        const response = await agent.post('/users').send(userData);
        const registeredUser = await usersRepository.findByEmail(userData.email);
        expect(response.status).toBe(201);
        expect(registeredUser).not.toBe(null);

    });

    test('should fail to create a new user with invalid fields, and return 422 status code', async ()=>{

        const response = await agent.post('/users').send({ email: 'invalidEmail', password: '123', confirmPassword: '123456' });
        expect(response.status).toBe(422);

    });

    test('should fail to create a new user with missing fields, and return 422 status code', async ()=>{

        const response = await agent.post('/users').send({ email: userData.email });
        expect(response.status).toBe(422);

    });

    test('should fail to create a new user with email already registered, and return 409 status code', async ()=>{

        const response = await agent.post('/users').send(userData);
        expect(response.status).toBe(409);

    });

    test('Should do login, and return a valid token', async ()=>{

        const response = await agent.post('/users/login').send({ email: userData.email, password: userData.password });
        expect(response.status).toBe(200);
        expect(response.body.token).not.toBe(null);

    });

    test('Should fail to do login with invalid credentials, and return 401 status code', async ()=>{

        const response = await agent.post('/users/login').send({ email: userData.email, password: 'invalidPassword' });
        expect(response.status).toBe(401);

    });

});

afterAll(async () => prisma.$disconnect());