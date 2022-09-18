import joi from 'joi';

const usersSchema = joi.object({
	email: joi.string().required().email(),
	password: joi.string().required(),
	confirmPassword: joi.string().required().valid(joi.ref('password'))
});

export default usersSchema;