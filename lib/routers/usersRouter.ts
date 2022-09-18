import { Router } from 'express';
import usersController from '../controllers/usersController';
import schemaValidator from '../middlewares/schemaValidator';
import usersSchema from '../schemas/usersSchema';
import loginSchema from '../schemas/loginSchema';

const router = Router();

router.post('/', 
    schemaValidator(usersSchema), 
    usersController.createUsers
);

router.post('/login', 
    schemaValidator(loginSchema),
    usersController.login
);

export default router;