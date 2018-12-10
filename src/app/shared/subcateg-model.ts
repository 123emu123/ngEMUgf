export class SubcategModel {
    id: string;
    name: string;

    constructor(param?: SubcategModel) {
        if (param) {
            Object.assign(this, param)
        }
    }
}