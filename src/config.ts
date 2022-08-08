import type { ISveltekitEnvironmentConfig } from './models/interfaces/';

const _config: ISveltekitEnvironmentConfig = {
	nodeEnv: import.meta.env.SKAJWT_NODE_ENV,
	isDebugMode: import.meta.env.SKAJWT_DEBUG_MODE,
	launchURL: import.meta.env.SKAJWT_GRAPHQL_ENDPOINT,
	appConfig: {
		NAME: import.meta.env.SKAJWT_NAME,
		DESCRIPTION: import.meta.env.SKAJWT_DESCRIPTION,
		AUTHOR: import.meta.env.SKAJWT_AUTHOR,
		EMAIL: import.meta.env.SKAJWT_EMAIL,
		WEBSITE: import.meta.env.SKAJWT_WEBSITE
	},
	jwtConfig: {
		JWT_SECRET: import.meta.env.SKAJWT_JWT_SECRET,
		JWT_ISSUER: import.meta.env.SKAJWT_JWT_ISSUER,
		JWT_REFRESH_EXPIREIN: import.meta.env.SKAJWT_JWT_REFRESH_EXPIREIN,
		JWT_ACCESS_EXPIREIN: import.meta.env.SKAJWT_JWT_ACCESS_EXPIREIN
	},
	cookieConfig: {
		COOKIE_REFRESH_MAXAGE: import.meta.env.SKAJWT_COOKIE_REFRESH_MAXAGE as number,
		COOKIE_ACCESS_MAXAGE: import.meta.env.SKAJWT_COOKIE_ACCESS_MAXAGE as number
	},
	graphQlConfig: {
		JWT_SECRET: import.meta.env.SKAJWT_GRAPHQL_JWT_SECRET
	}
};

export default _config;
