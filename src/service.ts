import { Recipe, RecipeRequest } from './types';
import Dynamo from './dynamo';
import { randomUUID } from 'crypto';

const dynamo = new Dynamo();

export const createRecipe = async (request: RecipeRequest): Promise<Recipe> => {
    const recipe: Recipe = {
        id: randomUUID(),
        ...request,
        createdAt: new Date().toISOString(),
        updatedAt: undefined,
    };
    await dynamo.putRecipe(recipe);
    return recipe;
};

export const getAllRecipes = async (): Promise<Recipe[]> => {
    const recipes = await dynamo.getAllRecipes();
    return recipes ?? [];
};

export const getOneRecipe = async (recipeId: string): Promise<Recipe> => {
    const recipe = await dynamo.getRecipe(recipeId);
    return recipe ?? ({} as Recipe);
};

export const updateRecipe = async (
    recipe: Recipe,
): Promise<Recipe | undefined> => {
    const record = await dynamo.getRecipe(recipe.id);
    if (!record) return undefined;

    await dynamo.putRecipe(recipe);
    return recipe;
};

export const deleteRecipe = async (recipeId: string): Promise<void> => {
    await dynamo.deleteRecipe(recipeId);
};
