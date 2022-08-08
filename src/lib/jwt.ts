import 'dotenv/config';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

//TODO create env all options here or some sort of config file

export const maxAge = 1 * 24 * 60 * 60;
export const createToken = (id: number) => {
	const jwt_secret: string = process.env.JWT_SECRET || '';
	return sign({ id }, jwt_secret, {
		expiresIn: maxAge
	});
};

export const createRefreshToken = () => {
	const jwt_secret: string = process.env.JWT_SECRET || '';
	return sign({}, jwt_secret, {
		expiresIn: '14d',
		issuer: 'lj'
	});
};

export const createAccessToken = (id: number, email: string) => {
	const jwt_secret: string = process.env.JWT_SECRET || '';
	return sign({ id, email }, jwt_secret, {
		expiresIn: '1m',
		issuer: 'lj'
	});
};
