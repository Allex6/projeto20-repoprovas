import prisma from './../lib/databases/prisma';

async function seedTerms() {

    await prisma.terms.create({ data: { number: 1 } });
    await prisma.terms.create({ data: { number: 2 } });
    await prisma.terms.create({ data: { number: 3 } });
    await prisma.terms.create({ data: { number: 4 } });
    await prisma.terms.create({ data: { number: 5 } });
    await prisma.terms.create({ data: { number: 6 } });

}

async function seedCategories() {

    await prisma.categories.create({ data: { name: 'Projeto' } });
    await prisma.categories.create({ data: { name: 'Prática' } });
    await prisma.categories.create({ data: { name: 'Recuperação' } });
}

async function seedTeachers(){

    await prisma.teachers.create({ data: { name: 'Diego Pinho' } });
    await prisma.teachers.create({ data: { name: 'Bruna Hamori' } });

}

async function seedDisciplines() {

    await prisma.disciplines.create({
        data: {
            name: 'HTML e CSS',
            termId: 1,
        }
    });

    await prisma.disciplines.create({
        data: {
            name: 'Javascript',
            termId: 2,
        }
    });

    await prisma.disciplines.create({
        data: {
            name: 'React',
            termId: 3,
        }
    });

    await prisma.disciplines.create({
        data: {
            name: 'Humildade',
            termId: 1,
        }
    });

    await prisma.disciplines.create({
        data: {
            name: 'Planejamento',
            termId: 2,
        }
    });

    await prisma.disciplines.create({
        data: {
            name: 'Autoconfiança',
            termId: 3,
        }
    });

}

async function seedTeachersDisciplines(){

    await prisma.teachersDisciplines.create({
        data: {
            teacherId: 1,
            disciplineId: 1,
        }
    });

    await prisma.teachersDisciplines.create({
        data: {
            teacherId: 1,
            disciplineId: 2,
        }
    });

    await prisma.teachersDisciplines.create({
        data: {
            teacherId: 1,
            disciplineId: 3,
        }
    });

    await prisma.teachersDisciplines.create({
        data: {
            teacherId: 2,
            disciplineId: 4,
        }
    });

    await prisma.teachersDisciplines.create({
        data: {
            teacherId: 2,
            disciplineId: 5,
        }
    });

    await prisma.teachersDisciplines.create({
        data: {
            teacherId: 2,
            disciplineId: 6,
        }
    });

}

async function main(){

    await seedTerms();
    await seedCategories();
    await seedTeachers();
    await seedDisciplines();
    await seedTeachersDisciplines();

}

(async () => {

    try {
    
        await main();
        await prisma.$disconnect();
        console.log('Seed completed!');
        process.exit(0);

    } catch (err) {
        console.log(err);
        await prisma.$disconnect();
        process.exit(1);
    }

})();