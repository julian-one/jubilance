import { createRecipe } from '../../../src/service';
import { Recipe, RecipeRequest } from '../../../src/types';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import * as random from '../../mock/data';

const FIXED_SYSTEM_TIME = '2023-07-09T00:00:00.000Z';

const recipeId = random.uuid();
jest.mock('crypto', () => ({ randomUUID: () => recipeId }));

describe('createRecipe', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);
    beforeEach(() => {
        ddbMock.reset();

        jest.useFakeTimers();
        jest.setSystemTime(Date.parse(FIXED_SYSTEM_TIME));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('a valid recipe request returns a recipe', async () => {
        const recipeRequest: RecipeRequest = {
            name: random.string(),
            ingredients: [],
            description: random.string(),
            steps: [],
        };
        const expected: Recipe = {
            id: recipeId,
            ...recipeRequest,
            createdAt: FIXED_SYSTEM_TIME,
            updatedAt: undefined,
        };
        ddbMock.on(PutCommand).resolves({});

        const result = await createRecipe(recipeRequest);

        expect(result).toEqual(expected);
    });
});
