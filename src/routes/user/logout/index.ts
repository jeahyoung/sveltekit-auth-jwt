import type { RequestHandler } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const get: RequestHandler = async () => {
	const cookies = [];
	cookies.push(
		cookie.serialize('accessToken', '', {
			path: '/',
			// the cookie should expire immediately
			expires: new Date(0)
		})
	);
	cookies.push(
		cookie.serialize('refreshToken', '', {
			path: '/',
			// the cookie should expire immediately
			expires: new Date(0)
		})
	);
	return {
		status: 303,
		headers: {
			'Set-Cookie': cookies,
			location: '/'
		}
	};
};
