export class UserModel {
    id: string;
    name: string;
    email: string;
    gender: string;
    profilepictureURL: string;

    constructor(param?: UserModel) {
        if (param) {
            Object.assign(this, param);
        }
    }
}
