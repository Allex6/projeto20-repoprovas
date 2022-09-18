import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function getToken(headers: any){

    if(headers && headers.authorization){
        const parted = headers.authorization.split(' ');
        if(parted.length === 2) return parted[1];
    }
    return null;

}

export default async function authenticationValidator(req :Request, res :Response, next :NextFunction){

    const token = getToken(req.headers);
    if(!token) return res.status(401).send('Unauthorized');

    try {
        
        const decoded: any = jwt.verify(token, JWT_SECRET);
        res.locals.userId = decoded.id;
        next();


    } catch (err) {
        console.log(err);
        return res.status(401).send('Invalid token');
    }

}