import Dynamo from '../../src/dynamo';
import * as random from '../mock/data';
import { mockClient } from 'aws-sdk-client-mock';
import {
    DeleteCommand,
    DynamoDBDocumentClient,
    PutCommand,
    ScanCommand,
    GetCommand,
} from '@aws-sdk/lib-dynamodb';

describe('Dynamo', () => {
    let dynamo: Dynamo;

    const ddbMock = mockClient(DynamoDBDocumentClient);
    beforeEach(() => {
        dynamo = new Dynamo();
        ddbMock.reset();
    });

    describe('putRecipe', () => {
        test('an error is thrown', async () => {
            ddbMock.on(PutCommand).rejects();

            await expect(async () => {
                await dynamo.putRecipe(random.recipe());
            }).rejects.toThrowError(Error);
        });
    });

    describe('getAllRecipes', () => {
        test('an error is thrown', async () => {
            ddbMock.on(ScanCommand).rejects();

            await expect(async () => {
                await dynamo.getAllRecipes();
            }).rejects.toThrowError(Error);
        });

        test('an undefinded result throws an error', async () => {
            ddbMock.on(ScanCommand).resolves({});

            const result = await dynamo.getAllRecipes();

            expect(result).toEqual(undefined);
        });
    });

    describe('getRecipe', () => {
        test('an error is thrown', async () => {
            ddbMock.on(GetCommand).rejects();

            await expect(async () => {
                await dynamo.getRecipe(random.uuid());
            }).rejects.toThrowError(Error);
        });

        test('an undefinded result throws an error', async () => {
            ddbMock.on(GetCommand).resolves({});

            const result = await dynamo.getRecipe(random.uuid());

            expect(result).toEqual(undefined);
        });
    });

    describe('deleteRecipe', () => {
        test('an error is thrown', async () => {
            ddbMock.on(DeleteCommand).rejects();

            await expect(async () => {
                await dynamo.deleteRecipe(random.uuid());
            }).rejects.toThrowError(Error);
        });
    });
});
