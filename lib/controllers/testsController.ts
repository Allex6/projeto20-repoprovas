import testsService from './../services/testsService';
import { Request, Response, NextFunction } from 'express';

async function createTests(req :Request, res :Response, next :NextFunction){

    const bodyData = req.body;
    await testsService.createTests(bodyData);
    res.sendStatus(201);

}

async function listByDiscipline(req :Request, res :Response, next :NextFunction){

    const tests = await testsService.listByDiscipline();
    res.send(tests);

}

async function listByTeachers(req :Request, res :Response, next :NextFunction){

    const tests = await testsService.listByTeachers();
    res.send(tests);

}

export default {
    createTests,
    listByDiscipline,
    listByTeachers
}