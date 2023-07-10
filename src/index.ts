import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Handler from './handler';

export async function main(
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
    const handler = new Handler();
    try {
        const { httpMethod, resource } = event;
        console.log('01.', httpMethod, resource);
        console.log('02.', event);
        if (httpMethod === 'POST' && resource === '/recipes')
            return handler.postRecipes(event);
        if (httpMethod === 'GET' && resource === '/recipes')
            return handler.getRecipes();
        if (httpMethod === 'GET' && resource === '/recipes/{id}')
            return handler.getRecipeById(event);
        if (httpMethod === 'PUT' && resource === '/recipes/{id}')
            return handler.putRecipe(event);
        if (httpMethod === 'DELETE' && resource === '/recipes/{id}')
            return handler.deleteRecipe(event);

        console.log('69. BOO!!');
        return handler.toResult(404, 'bad request: no route');
    } catch {
        return handler.toResult(
            500,
            'internal server error: something went wrong',
        );
    }
}
