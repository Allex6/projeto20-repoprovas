import prisma from '../databases/prisma';
import { CreateUserData } from '../types/UserTypes';

/**
 * @description Insert a new users record into the database.
 * @param {Object} userData An object with the fields needed to create a users
 */
async function create(userData: CreateUserData){
    
    await prisma.users.create({ data: userData });

}

async function findByEmail(email: string){

    const user = await prisma.users.findUnique({
        where: {
            email
        }
    });
    return user;

}

/**
 * @description Search for a list of userss.
 * @returns A list of userss.
 */
async function list(){

    return await prisma.users.findMany();

}

export default {
    create,
    findByEmail,
    list
}