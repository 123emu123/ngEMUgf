export class RecipeModel {
    id?: string;
    name: string;
    ingred: string;
    descript: string;
    pictureUrl: string;
    userId: string;
    categId: string;
    subcategId: string;

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
        userId: '1',
      categId: '0',
      subcategId: '0'

      };
    }
}
