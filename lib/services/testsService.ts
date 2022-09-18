import categoriesRepository from '../repositories/categoriesRepository';
import teachersDisciplinesRepository from '../repositories/teachersDisciplinesRepository';
import testsRepository from '../repositories/testsRepository';
import { CreateTestData } from '../types/TestTypes';
import errorFactory from '../utils/errorFactory';

async function createTests(testsData: CreateTestData){
    
    const category = await categoriesRepository.getById(testsData.categoryId);
    if(!category) throw errorFactory('not_found', 'Category not found');

    const teacherDiscipline = await teachersDisciplinesRepository.getById(testsData.teacherDisciplineId);
    if(!teacherDiscipline) throw errorFactory('not_found', 'TeacherDiscipline not found');

    await testsRepository.create(testsData);

}

function formatTests(tests: any[], groupBy = 'discipline'){

    const termsHashtable: any = {};

    for(const test of tests){

        const { name, teachersDisciplines, categories, pdfUrl } = test;

        const disciplines = teachersDisciplines.disciplines;
        const terms = teachersDisciplines.disciplines.terms;
        const categoryName = categories.name;
        const termNumber = terms.number;
        const disciplineName = disciplines.name;
        const teacherName = teachersDisciplines.teachers.name;

        if(groupBy === 'discipline'){

            if(!termsHashtable[termNumber]) termsHashtable[termNumber] = {};
            if(!termsHashtable[termNumber][disciplineName]) termsHashtable[termNumber][disciplineName] = {};

            if(!termsHashtable[termNumber][disciplineName][categoryName]) termsHashtable[termNumber][disciplineName][categoryName] = [];

            termsHashtable[termNumber][disciplineName][categoryName].push({
                name,
                teacherName,
                pdfUrl,
                id: test.id
            });

        } else if(groupBy === 'teacher'){

            if(!termsHashtable[teacherName]) termsHashtable[teacherName] = {};
            if(!termsHashtable[teacherName][categoryName]) termsHashtable[teacherName][categoryName] = [];

            termsHashtable[teacherName][categoryName].push({
                name,
                disciplineName,
                pdfUrl,
                id: test.id
            });

        }

    }

    return termsHashtable;

}

async function listByDiscipline(){

    const tests = await testsRepository.list();
    return formatTests(tests);

}

async function listByTeachers(){

    const tests = await testsRepository.list();
    return formatTests(tests, 'teacher');

}

export default {
    createTests,
    listByDiscipline,
    listByTeachers
}