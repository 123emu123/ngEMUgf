export class UserModel {
    id: number;
    name: string;
    email: string;
    gender: string;
    profilePictureURL: string;

    constructor(param?: UserModel) {
        if (param) {
            Object.assign(this, param);
        }
    }

    static get exampleUser(): UserModel {
        return {
            id: 0,
            name: 'Valaki Vagyok',
            email: 'valaki@vagyok.hu',
            gender: 'female',
            profilePictureURL: 'assets/pofi.jpg'
        };
    }

    static get emptyUser(): UserModel {
        return {
            id: 0,
            name: '',
            email: '',
            gender: '',
            profilePictureURL: ''
        };
    }
}
