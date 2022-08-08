/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user?: { id: number; email: string };
	}
	// interface Platform {}
	interface Session {
		user?: { id: number; email: string };
	}
	// interface Stuff {}
}

interface ImportMetaEnv {
	SKAJWT_NODE_ENV: string;
	SKAJWT_DEBUG_MODE: string;
	SKAJWT_NAME: string;
	SKAJWT_DESCRIPTION: string;
	SKAJWT_AUTHOR: string;
	SKAJWT_EMAIL: string;
	SKAJWT_WEBSITE: string;
	SKAJWT_JWT_SECRET: string;
	SKAJWT_JWT_ISSUER: string;
	SKAJWT_COOKIE_REFRESH_MAXAGE: number;
	SKAJWT_COOKIE_ACCESS_MAXAGE: number;
	SKAJWT_GRAPHQL_ENDPOINT: string;
	SKAJWT_GRAPHQL_JWT_SECRET: string;
}
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
