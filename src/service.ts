import { Recipe, RecipeRequest } from './types';
import Dynamo from './dynamo';
import { randomUUID } from 'crypto';

const dynamo = new Dynamo();

export const createRecipe = async (request: RecipeRequest): Promise<Recipe> => {
    console.log('service | createRecipe event:', request);
    const recipe: Recipe = {
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        isFavorite: request.isFavorite ? request.isFavorite : false,
        ...request,
    };

    console.log('service | createRecipe recipe:', recipe);

    await dynamo.putRecipe(recipe);
    return recipe;
};

export const getAllRecipes = async (): Promise<Recipe[]> => {
    const recipes = await dynamo.getAllRecipes();
    return recipes ?? [];
};

export const updateRecipe = async (
    recipe: Recipe,
): Promise<Recipe | undefined> => {
    const record = await dynamo.getRecipe(recipe.id);
    if (!record) return undefined;

    recipe.updatedAt = new Date().toISOString();

    await dynamo.putRecipe(recipe);
    return recipe;
};

export const deleteRecipe = async (recipeId: string): Promise<void> => {
    await dynamo.deleteRecipe(recipeId);
};
