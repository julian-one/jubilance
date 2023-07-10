type Step = {
    order: number;
    content: string;
};

type Ingredient = {
    unit?: string;
    quantity?: number;
    content: string;
};

type RecipeRequest = {
    name: string;
    description?: string;
    ingredients: Ingredient[];
    steps: Step[];
};

type Recipe = RecipeRequest & {
    id: string;
    createdAt: string;
    updatedAt: string | undefined;
};

function isRecipe(obj: Recipe): obj is Recipe {
    return 'id' in obj && 'name' in obj && 'steps' in obj;
}

function isRecipeRequest(obj: RecipeRequest): obj is RecipeRequest {
    return 'name' in obj && 'steps' in obj;
}

export { RecipeRequest, Recipe, isRecipe, isRecipeRequest };
