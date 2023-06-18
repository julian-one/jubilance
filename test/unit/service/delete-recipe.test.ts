import { deleteRecipe } from '../../../src/service';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import * as random from '../../mock/data';

describe('deleteRecipe', () => {
    const recipeId = random.string();
    const ddbMock = mockClient(DynamoDBDocumentClient);
    beforeEach(() => {
        ddbMock.reset();
    });

    test('void result', async () => {
        const result = await deleteRecipe(recipeId);
        ddbMock.on(DeleteCommand).resolvesOnce({});

        expect(result).toBeUndefined();
    });
});
