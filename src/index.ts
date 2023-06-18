import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Handler from './handler';

export async function main(
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
    const handler = new Handler();

    const method = event.httpMethod;
    const path = event.requestContext.path;

    if (method === 'POST' && path === '/recipes')
        return handler.postRecipes(event);
    if (method === 'GET' && path === '/recipes') return handler.getRecipes();
    if (method === 'GET' && path === '/recipes/{id}')
        return handler.getRecipeById(event);
    if (method === 'PUT' && path === '/recipes/{id}')
        return handler.putRecipe(event);
    if (method === 'DELETE' && path === '/recipes/{id}')
        return handler.deleteRecipe(event);

    return handler.toResult(400, 'bad request: no route');
}
