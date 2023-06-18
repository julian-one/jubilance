import { getOneRecipe } from '../../../src/service';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import * as random from '../../mock/data';

describe('getOneRecipe', () => {
    const recipeId = random.string();
    const ddbMock = mockClient(DynamoDBDocumentClient);
    beforeEach(() => {
        ddbMock.reset();
    });

    test('returns a recipe', async () => {
        const recipeRecord = random.recipeRecord();
        const expected = recipeRecord.recipe;
        ddbMock.on(GetCommand).resolvesOnce({
            Item: recipeRecord,
        });

        const result = await getOneRecipe(recipeId);

        expect(result).toEqual(expected);
    });
});
