import { faker } from '@faker-js/faker';

export default function userFactory(samePassword = true){

    const password = faker.internet.password();

    return {
        email: faker.internet.email(),
        password,
        confirmPassword: samePassword ? password : faker.internet.password()
    }

};