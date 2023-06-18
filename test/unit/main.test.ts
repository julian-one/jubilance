import { main } from '../../src/index';
import Handler from '../../src/handler';
import proxyEvent from '../mock/proxy-event';
import * as random from '../mock/data';

jest.mock('../../src/handler');

describe('main', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('POST /recipes', async () => {
        const spy = jest.spyOn(Handler.prototype, 'postRecipes');

        const event = proxyEvent('POST', '/recipes');
        await main(event);

        expect(spy).toHaveBeenCalled();
    });

    test('GET /recipes', async () => {
        const spy = jest.spyOn(Handler.prototype, 'getRecipes');

        const event = proxyEvent('GET', '/recipes');
        await main(event);

        expect(spy).toHaveBeenCalled();
    });

    test('GET /recipes/{id}', async () => {
        const spy = jest.spyOn(Handler.prototype, 'getRecipeById');

        const event = proxyEvent('GET', '/recipes/{id}');
        await main(event);

        expect(spy).toHaveBeenCalled();
    });

    test('PUT /recipes', async () => {
        const spy = jest.spyOn(Handler.prototype, 'putRecipe');

        const event = proxyEvent('PUT', '/recipes/{id}');
        await main(event);

        expect(spy).toHaveBeenCalled();
    });

    test('DELETE /recipes', async () => {
        const spy = jest.spyOn(Handler.prototype, 'deleteRecipe');

        const event = proxyEvent('DELETE', '/recipes/{id}');
        await main(event);

        expect(spy).toHaveBeenCalled();
    });

    test('an unsupported request', async () => {
        const spy = jest.spyOn(Handler.prototype, 'toResult');

        const event = proxyEvent(random.string(), '/');
        await main(event);

        expect(spy).toHaveBeenCalled();
    });
});
