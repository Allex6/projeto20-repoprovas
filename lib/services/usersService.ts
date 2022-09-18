import usersRepository from '../repositories/usersRepository';
import { CreateUserData } from '../types/UserTypes';
import errorFactory from '../utils/errorFactory';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

async function createUsers(userData: CreateUserData){
    
    const user = await usersRepository.findByEmail(userData.email);
    if(user) throw errorFactory('conflict', 'Email already in use');

    userData.password = await bcrypt.hash(userData.password, 12);
    await usersRepository.create(userData);

}

async function list(){

    await usersRepository.list();

}

async function login(email: string, password: string){

    const user = await usersRepository.findByEmail(email);
    if(!user) throw errorFactory('unauthorized', 'Invalid credentials');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) throw errorFactory('unauthorized', 'Invalid credentials');

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    return token;

}

export default {
    createUsers,
    login,
    list
}