export interface IConfig {
	launchURL?: string;
	nodeEnv?: string;
	isDebugMode?: string;
}
export interface IAppConfig {
	NAME: string;
	DESCRIPTION: string;
	AUTHOR: string;
	EMAIL: string;
	WEBSITE: string;
}
export interface IJwtConfig {
	JWT_SECRET: string;
	JWT_ISSUER: string;
    JWT_REFRESH_EXPIREIN: string;
    JWT_ACCESS_EXPIREIN: string;
}
export interface ICookieConfig {
	COOKIE_REFRESH_MAXAGE: number;
	COOKIE_ACCESS_MAXAGE: number;
}
export interface IGraphQlConfig {
	JWT_SECRET: string;
}
export type IEnvironmentConfig = IConfig;
export interface ISveltekitEnvironmentConfig extends IEnvironmentConfig {
	appConfig: Partial<IAppConfig>;
	jwtConfig: Partial<IJwtConfig>;
	cookieConfig: Partial<ICookieConfig>;
	graphQlConfig: Partial<IGraphQlConfig>;
}
