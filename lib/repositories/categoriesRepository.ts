import prisma from '../databases/prisma';

async function getById(id: number){

    return await prisma.categories.findUnique({
        where: {
            id
        }
    });

}

export default {
    getById
}