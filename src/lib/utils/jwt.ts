import _config from '../../config';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

export const createRefreshToken = () => {
	const jwt_secret: string = _config.jwtConfig.JWT_SECRET || '';
	return sign({}, jwt_secret, {
		expiresIn: _config.jwtConfig.JWT_REFRESH_EXPIREIN,
		issuer: _config.jwtConfig.JWT_ISSUER
	});
};

export const createAccessToken = (id: number, email: string) => {
	const jwt_secret: string = _config.jwtConfig.JWT_SECRET || '';
	return sign({ id, email }, jwt_secret, {
		expiresIn: _config.jwtConfig.JWT_ACCESS_EXPIREIN,
		issuer: _config.jwtConfig.JWT_ISSUER
	});
};
