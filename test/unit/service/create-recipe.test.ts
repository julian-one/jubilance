import { createRecipe } from '../../../src/service';
import { Recipe, RecipeRequest } from '../../../src/types';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import * as random from '../../mock/data';

const recipeId = random.uuid();
jest.mock('uuid', () => ({ v4: () => recipeId }));

describe('createRecipe', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);
    beforeEach(() => {
        ddbMock.reset();
    });

    test('a valid recipe request returns a recipe', async () => {
        const recipeRequest: RecipeRequest = {
            name: random.string(),
            description: random.string(),
            steps: [],
        };
        const expected: Recipe = { id: recipeId, ...recipeRequest };
        ddbMock.on(PutCommand).resolves({});

        const result = await createRecipe(recipeRequest);

        expect(result).toEqual(expected);
    });
});
