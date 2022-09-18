import supertest from 'supertest';
import app from './../app';
import prisma from '../lib/databases/prisma';
import testFactory from './factories/testFactory';
import userFactory from './factories/userFactory';
import testsRepository from '../lib/repositories/testsRepository';

const agent = supertest(app);
let bearerAuthentication: string;

beforeAll(async () => prisma.$executeRaw`TRUNCATE TABLE tests CASCADE`);

beforeEach(async ()=>{

    const userData = userFactory();
    await agent.post('/users').send(userData);
    const response = await agent.post('/users/login').send({ email: userData.email, password: userData.password });
    bearerAuthentication = `Bearer ${response.body.token}`;

});

describe('Tests Routes', ()=>{

    const testDataModel = testFactory();

    test('should create a new test with valid fields, and return 201 status code', async ()=>{

        const response = await agent.post('/tests').send(testDataModel).set('Authorization', bearerAuthentication);
        expect(response.status).toBe(201);

    });

    test('should fail to create a new test with invalid fields, and return 422 status code', async ()=>{

        const testData = {...testDataModel};
        testData.pdfUrl = 'invalid pdf url';
        const response = await agent.post('/tests').send(testData).set('Authorization', bearerAuthentication);
        expect(response.status).toBe(422);


    });

    test('should fail to create a new test with missing fields, and return 422 status code', async ()=>{

        const response = await agent.post('/tests').send({ pdfUrl: testDataModel.pdfUrl }).set('Authorization', bearerAuthentication);
        expect(response.status).toBe(422);


    });

    test('should fail to create a new test with invalid categoryId, and return 404 status code', async ()=>{

        const testData = {...testDataModel};
        testData.categoryId = 1000000;
        const response = await agent.post('/tests').send(testData).set('Authorization', bearerAuthentication);
        expect(response.status).toBe(404);

    });

    test('should fail to create a new test with invalid teacherDisciplineId, and return 404 status code', async ()=>{

        const testData = {...testDataModel};
        testData.teacherDisciplineId = 1000000;
        const response = await agent.post('/tests').send(testData).set('Authorization', bearerAuthentication);
        expect(response.status).toBe(404);

    });

    test('Should fail to return an object of tests passing an invalid token, and return 401 status code', async ()=>{

        const response = await agent.get('/tests/group-by/disciplines').set('Authorization', 'Bearer invalidToken');
        expect(response.status).toBe(401);


    });

    test('Should return an object of tests grouped by disciplines, and return 200 status code', async ()=>{

        const response = await agent.get('/tests/group-by/disciplines').set('Authorization', bearerAuthentication);
        expect(response.status).toBe(200);
        expect(response.body).not.toBe(null);

    });

    test('Should return an object of tests grouped by teachers, and return 200 status code', async ()=>{

        const response = await agent.get('/tests/group-by/teachers').set('Authorization', bearerAuthentication);
        expect(response.status).toBe(200);
        expect(response.body).not.toBe(null);

    });

});

afterAll(async () => prisma.$disconnect());