import { Router } from 'express';
import testsController from '../controllers/testsController';
import authenticationValidator from '../middlewares/authenticationValidator';
import schemaValidator from '../middlewares/schemaValidator';
import testsSchema from '../schemas/testsSchema';

const router = Router();

router.post('/', 
    authenticationValidator,
    schemaValidator(testsSchema),
    testsController.createTests
);

router.get('/group-by/disciplines', 
    authenticationValidator,
    testsController.listByDiscipline
);

router.get('/group-by/teachers', 
    authenticationValidator,
    testsController.listByTeachers
);

export default router;