import { APIGatewayProxyEvent } from 'aws-lambda';
import Handler from '../../src/handler';
import proxyEvent from '../mock/proxy-event';
import * as random from '../mock/data';
import * as service from '../../src/service';

describe('Handler', () => {
    describe('postRecipe', () => {
        let event: APIGatewayProxyEvent;
        const handler = new Handler();

        beforeEach(() => {
            event = proxyEvent();
        });

        test('no body', async () => {
            const result = await handler.postRecipes(event);

            expect(result.statusCode).toEqual(400);
            expect(result.body).toEqual('bad request: no body');
        });

        test('not a recipe', async () => {
            const recipe = {
                name: random.string(),
            };
            event.body = JSON.stringify({ recipe });

            const result = await handler.postRecipes(event);

            expect(result.statusCode).toEqual(400);
            expect(result.body).toEqual('bad request: not a recipe');
        });

        test('service throwing an error', async () => {
            const recipe = random.recipe();
            event.body = JSON.stringify(recipe);

            jest.spyOn(service, 'createRecipe').mockRejectedValue(new Error());

            const result = await handler.postRecipes(event);

            expect(result.statusCode).toEqual(500);
            expect(result.body).toEqual(
                'internal server error: unable to create recipe',
            );
        });

        test('happy path', async () => {
            const recipe = random.recipe();
            event.body = JSON.stringify(recipe);

            jest.spyOn(service, 'createRecipe').mockResolvedValue(recipe);

            const result = await handler.postRecipes(event);
            const body = JSON.parse(result.body);

            expect(result.statusCode).toEqual(201);
            expect(body).toEqual(recipe);
        });
    });

    describe('getRecipes', () => {
        const handler = new Handler();

        test('happy path', async () => {
            const recipes = [random.recipe()];

            jest.spyOn(service, 'getAllRecipes').mockResolvedValueOnce(recipes);

            const result = await handler.getRecipes();
            const body = JSON.parse(result.body);

            expect(result.statusCode).toEqual(200);
            expect(body).toEqual(recipes);
        });
    });

    describe('getRecipeById', () => {
        let event: APIGatewayProxyEvent;
        const handler = new Handler();

        beforeEach(() => {
            event = proxyEvent();
        });

        test('no recipe id', async () => {
            event.pathParameters = { notAnId: random.uuid() };

            const result = await handler.getRecipeById(event);

            expect(result.statusCode).toEqual(400);
            expect(result.body).toEqual('bad request: no id');
        });

        test('happy path', async () => {
            const recipe = random.recipe();
            event.pathParameters = { id: recipe.id };

            jest.spyOn(service, 'getOneRecipe').mockResolvedValueOnce(recipe);

            const result = await handler.getRecipeById(event);
            const body = JSON.parse(result.body);

            expect(result.statusCode).toEqual(200);
            expect(body).toEqual(recipe);
        });
    });

    describe('putRecipe', () => {
        let event: APIGatewayProxyEvent;
        const handler = new Handler();

        beforeEach(() => {
            event = proxyEvent();
        });

        test('no body', async () => {
            const result = await handler.putRecipe(event);

            expect(result.statusCode).toEqual(400);
            expect(result.body).toEqual('bad request: no body');
        });

        test('not a recipe', async () => {
            const recipe = {
                name: random.string(),
            };
            event.body = JSON.stringify({ recipe });

            const result = await handler.putRecipe(event);

            expect(result.statusCode).toEqual(400);
            expect(result.body).toEqual('bad request: not a recipe');
        });

        test('service throwing an error', async () => {
            const recipe = random.recipe();
            event.body = JSON.stringify(recipe);

            jest.spyOn(service, 'updateRecipe').mockRejectedValue(new Error());

            const result = await handler.putRecipe(event);

            expect(result.statusCode).toEqual(500);
            expect(result.body).toEqual(
                'internal server error: unable to update recipe',
            );
        });

        test('happy path', async () => {
            const recipe = random.recipe();
            event.body = JSON.stringify(recipe);

            jest.spyOn(service, 'updateRecipe').mockResolvedValue(recipe);

            const result = await handler.putRecipe(event);
            const body = JSON.parse(result.body);

            expect(result.statusCode).toEqual(200);
            expect(body).toEqual(recipe);
        });
    });

    describe('deleteRecipe', () => {
        let event: APIGatewayProxyEvent;
        const handler = new Handler();

        beforeEach(() => {
            event = proxyEvent();
        });

        test('no recipe id', async () => {
            event.pathParameters = { notAnId: random.uuid() };

            const result = await handler.deleteRecipe(event);

            expect(result.statusCode).toEqual(400);
            expect(result.body).toEqual('bad request: no id');
        });

        test('happy path', async () => {
            event.pathParameters = { id: random.uuid() };

            jest.spyOn(service, 'deleteRecipe').mockResolvedValue();

            const result = await handler.deleteRecipe(event);

            expect(result.statusCode).toEqual(204);
            expect(result.body).toEqual('');
        });
    });
});
