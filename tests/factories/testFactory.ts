import { faker } from '@faker-js/faker';

export default function testFactory(randomCategory = false, randomTeacherDiscipline = false) {

    return {
        name: faker.lorem.words(2),
        pdfUrl: faker.internet.url(),
        categoryId: randomCategory ? faker.datatype.number() : 1,
        teacherDisciplineId: randomTeacherDiscipline ? faker.datatype.number() : 1
    }

};