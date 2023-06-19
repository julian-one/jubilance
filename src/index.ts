import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Handler from './handler';

export async function main(
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
    const handler = new Handler();

    const method = event.httpMethod;
    const resource = event.requestContext.path;
    console.log('event received:', method, resource, event);

    if (method === 'POST' && resource === '/recipes')
        return handler.postRecipes(event);
    if (method === 'GET' && resource === '/recipes')
        return handler.getRecipes();
    if (method === 'GET' && resource === '/recipes/{id}')
        return handler.getRecipeById(event);
    if (method === 'PUT' && resource === '/recipes/{id}')
        return handler.putRecipe(event);
    if (method === 'DELETE' && resource === '/recipes/{id}')
        return handler.deleteRecipe(event);

    return handler.toResult(400, 'bad request: no route');
}
