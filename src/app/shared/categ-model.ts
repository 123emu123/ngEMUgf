export class CategModel {
    id: string;
    name: string;
    pictureUrl: string;

    constructor(param?: CategModel) {
        if (param) {
            Object.assign(this, param)
        }
    }

    static get emptyCateg(): CategModel {
        return {
            id: '0',
            name: '',
            pictureUrl: ''
        };
    }
}