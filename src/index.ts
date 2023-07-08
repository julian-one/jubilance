import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Handler from './handler';

export async function main(
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
    const handler = new Handler();
    try {
        const { httpMethod, path } = event;

        if (httpMethod === 'POST' && path === '/recipes')
            return handler.postRecipes(event);
        if (httpMethod === 'GET' && path === '/recipes')
            return handler.getRecipes();
        if (httpMethod === 'GET' && path === '/recipes/{id}')
            return handler.getRecipeById(event);
        if (httpMethod === 'PUT' && path === '/recipes/{id}')
            return handler.putRecipe(event);
        if (httpMethod === 'DELETE' && path === '/recipes/{id}')
            return handler.deleteRecipe(event);

        return handler.toResult(404, 'bad request: no route');
    } catch {
        return handler.toResult(
            500,
            'internal server error: something went wrong',
        );
    }
}
