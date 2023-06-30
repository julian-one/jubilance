import { faker } from '@faker-js/faker';
import { Recipe } from '../../src/types';

const string = () => faker.string.sample();

const number = () => faker.number.int();

const uuid = () => faker.string.uuid();

const recipe = (id?: string): Recipe => {
    return {
        id: id ?? uuid(),
        name: string(),
        description: string(),
        steps: [
            {
                order: number(),
                content: string(),
            },
        ],
    };
};

export { string, number, uuid, recipe };
