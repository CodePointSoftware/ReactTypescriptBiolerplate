export interface UserResponseInterface {
    name: string;
    height: number;
    mass: number;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
}

export default class User {
    constructor(response: UserResponseInterface) {
        Object.keys(response).forEach((item: string) => {
            this[item] = response[item];
        })
    }
}