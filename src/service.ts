import { Recipe, RecipeRequest } from './types';
import Dynamo from './dynamo';
import { randomUUID } from 'crypto';

const dynamo = new Dynamo();

export const createRecipe = async (request: RecipeRequest): Promise<Recipe> => {
    const recipe = {
        id: randomUUID(),
        ...request,
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

export const updateRecipe = async (recipe: Recipe): Promise<Recipe> => {
    await dynamo.putRecipe(recipe);
    return recipe;
};

export const deleteRecipe = async (recipeId: string): Promise<void> => {
    await dynamo.deleteRecipe(recipeId);
};
