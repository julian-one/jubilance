import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    GetCommand,
    ScanCommand,
    PutCommand,
    DeleteCommand,
} from '@aws-sdk/lib-dynamodb';
import { Recipe } from './types';

const REGION = 'us-west-2';

class Dynamo {
    private documentClient: DynamoDBDocumentClient;
    private tableName: string;

    constructor() {
        this.documentClient = DynamoDBDocumentClient.from(
            new DynamoDBClient({ region: REGION }),
        );
        this.tableName = 'recipes';
    }

    async putRecipe(recipe: Recipe): Promise<void> {
        const command = new PutCommand({
            TableName: this.tableName,
            Item: {
                id: recipe.id,
                recipe,
            },
        });
        await this.documentClient.send(command);
    }

    async getAllRecipes(): Promise<Recipe[] | undefined> {
        const command = new ScanCommand({
            TableName: this.tableName,
        });
        const { Items } = await this.documentClient.send(command);
        if (!Items) return undefined;

        return Items.map((item) => {
            return item.recipe;
        });
    }

    async getRecipe(recipeId: string): Promise<Recipe | undefined> {
        const command = new GetCommand({
            TableName: this.tableName,
            Key: { id: recipeId },
        });
        console.log('dynamo | getRecipe');
        const { Item } = await this.documentClient.send(command);
        console.log('dynamo | getRecipe', Item);
        if (!Item) return undefined;
        return Item.recipe;
    }

    async deleteRecipe(recipeId: string): Promise<void> {
        const command = new DeleteCommand({
            TableName: this.tableName,
            Key: { id: recipeId },
        });
        await this.documentClient.send(command);
    }
}

export default Dynamo;
