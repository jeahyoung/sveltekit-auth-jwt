import { sign } from "jsonwebtoken";

export const maxAge = 1 * 24 * 60 * 60;
export const createToken = (id: number) => {
    return sign({id}, 'secret_key', {
        expiresIn: maxAge
    });
}