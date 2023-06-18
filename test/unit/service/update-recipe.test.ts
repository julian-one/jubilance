import { updateRecipe } from '../../../src/service';
import { Recipe } from '../../../src/types';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import * as random from '../../mock/data';

describe('updateRecipe', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);
    beforeEach(() => {
        ddbMock.reset();
    });

    test('a valid recipe request returns a recipe', async () => {
        const recipe: Recipe = {
            id: random.uuid(),
            name: random.string(),
            description: random.string(),
            steps: [],
        };
        ddbMock.on(PutCommand).resolves({});

        const result = await updateRecipe(recipe);

        expect(result).toEqual(recipe);
    });
});
