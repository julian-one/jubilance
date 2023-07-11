type Step = {
    order: number;
    content: string;
};

type Ingredient = {
    unit?: string;
    quantity?: number;
    content: string;
};

type RecipeCategory =
    | 'Appetizers'
    | 'Main Dishes'
    | 'Desserts'
    | 'Salads'
    | 'Soups'
    | 'Beverages'
    | 'Breads'
    | 'Side Dishes'
    | 'Breakfast'
    | 'Snacks'
    | 'Vegetarian';

type RecipeRequest = {
    name: string;
    description?: string;
    url?: string;
    category?: RecipeCategory;
    isFavorite?: boolean;
    ingredients: Ingredient[];
    steps: Step[];
};

type Recipe = RecipeRequest & {
    id: string;
    isFavorite: boolean;
    createdAt: string;
    updatedAt?: string;
};

function isRecipe(obj: Recipe): obj is Recipe {
    return 'id' in obj && 'name' in obj && 'steps' in obj;
}

function isRecipeRequest(obj: RecipeRequest): obj is RecipeRequest {
    return 'name' in obj && 'steps' in obj;
}

export { RecipeRequest, Recipe, isRecipe, isRecipeRequest };
