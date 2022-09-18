import usersService from './../services/usersService';
import { Request, Response, NextFunction } from 'express';

async function createUsers(req :Request, res :Response, next :NextFunction){

    const bodyData = req.body;
    delete bodyData.confirmPassword;
    await usersService.createUsers(bodyData);
    res.sendStatus(201);

}

async function list(req :Request, res :Response, next :NextFunction){

    const userss = await usersService.list();
    res.send(userss);

}

async function login(req :Request, res :Response, next :NextFunction){

    const { email, password } = req.body;
    const token = await usersService.login(email, password);
    res.send({ token });
    
}

export default {
    createUsers,
    login,
    list
}