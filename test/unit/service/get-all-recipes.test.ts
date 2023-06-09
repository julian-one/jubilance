import { getAllRecipes } from '../../../src/service';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import * as random from '../../mock/data';

describe('getAllRecipes', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);
    beforeEach(() => {
        ddbMock.reset();
    });

    test('returns an array of recipes', async () => {
        const recipeRecord = { recipe: random.recipe() };
        const expected = [recipeRecord.recipe];
        ddbMock.on(ScanCommand).resolvesOnce({
            Items: [recipeRecord],
            Count: 1,
        });

        const result = await getAllRecipes();

        expect(result).toEqual(expected);
    });

    test('returns an empty array', async () => {
        ddbMock.on(ScanCommand).resolvesOnce({
            Items: undefined,
            Count: 0,
        });

        const result = await getAllRecipes();

        expect(result).toEqual([]);
    });
});
