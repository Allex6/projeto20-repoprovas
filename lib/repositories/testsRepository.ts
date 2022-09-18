import prisma from '../databases/prisma';
import { CreateTestData } from '../types/TestTypes';

/**
 * @description Insert a new tests record into the database.
 * @param {Object} testsData An object with the fields needed to create a tests
 */
async function create(testsData: CreateTestData){
    
    await prisma.tests.create({ data: testsData });

}

/**
 * @description Search for a list of tests.
 * @returns A list of tests.
 */
 async function list(){

    const tests = await prisma.tests.findMany({
        include: {
            teachersDisciplines: {
                include: {
                    teachers: true,
                    disciplines: {
                        include: {
                            terms: true
                        }
                    }
                }
            },
            categories: true
        }
    });

    return tests;

}

export default {
    create,
    list
}