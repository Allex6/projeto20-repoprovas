import prisma from '../databases/prisma';

async function getById(id: number){

    return await prisma.teachersDisciplines.findUnique({
        where: {
            id
        }
    });

}

export default {
    getById
}