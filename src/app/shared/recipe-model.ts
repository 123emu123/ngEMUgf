export class RecipeModel {
    id?: number;
    name: string;
    ingred: string;
    descript: string;
    pictureUrl: string;
    userId: number;
    categId: number;

    constructor(param?: RecipeModel) {
        if (param) {}
        Object.assign(this, param)
    }

    static get emptyRecipe(): RecipeModel {
        return {
            name: '',
            ingred: '',
            descript: '',
            pictureUrl: '',
            userId: 1,
            categId: 0
        };
    }
}
