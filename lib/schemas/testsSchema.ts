import joi from 'joi';

const testsSchema = joi.object({
	name: joi.string().required(),
	pdfUrl: joi.string().uri().required(),
	categoryId: joi.number().required(),
	teacherDisciplineId: joi.number().required()
});

export default testsSchema;