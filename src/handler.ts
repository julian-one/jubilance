import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
    createRecipe,
    getAllRecipes,
    deleteRecipe,
    updateRecipe,
} from './service';
import { Recipe, RecipeRequest, isRecipe, isRecipeRequest } from './types';

class Handler {
    toResult(statusCode: number, body: string): APIGatewayProxyResult {
        return {
            statusCode,
            body,
        };
    }

    async deleteRecipe(
        event: APIGatewayProxyEvent,
    ): Promise<APIGatewayProxyResult> {
        const recipeId = event.pathParameters?.id;
        if (!recipeId) return this.toResult(400, 'bad request: no id');
        await deleteRecipe(recipeId);
        return this.toResult(204, '');
    }

    async putRecipe(
        event: APIGatewayProxyEvent,
    ): Promise<APIGatewayProxyResult> {
        const eventBody = event.body;
        if (!eventBody) return this.toResult(400, 'bad request: no body');

        const recipe = JSON.parse(eventBody) as Recipe;
        if (!isRecipe(recipe))
            return this.toResult(400, 'bad request: not a recipe');

        try {
            const updatedRecipe = await updateRecipe(recipe);
            if (!updatedRecipe)
                return this.toResult(
                    404,
                    `not found: no recipe with the id=${recipe.id}`,
                );

            return this.toResult(200, JSON.stringify(updatedRecipe));
        } catch (error) {
            console.error(error);
            return this.toResult(
                500,
                'internal server error: unable to update recipe',
            );
        }
    }

    async getRecipes(): Promise<APIGatewayProxyResult> {
        const recipes = await getAllRecipes();
        return this.toResult(200, JSON.stringify(recipes));
    }

    async postRecipes(
        event: APIGatewayProxyEvent,
    ): Promise<APIGatewayProxyResult> {
        console.log('handler | postRecipes', event);

        const eventBody = event.body;
        if (!eventBody) return this.toResult(400, 'bad request: no body');

        const recipeRequest = JSON.parse(eventBody) as RecipeRequest;
        if (!isRecipeRequest(recipeRequest))
            return this.toResult(400, 'bad request: not a recipe');

        try {
            console.log('handler | before createRecipe', recipeRequest);

            const recipe = await createRecipe(recipeRequest);
            return this.toResult(201, JSON.stringify(recipe));
        } catch (error) {
            console.error(error);
            return this.toResult(
                500,
                'internal server error: unable to create recipe',
            );
        }
    }
}

export default Handler;
