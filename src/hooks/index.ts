import * as cookie from 'cookie';
import pkg from 'jsonwebtoken';
const { verify } = pkg;

import _config from '../config';
import { createAccessToken } from '$lib/utils/jwt';
import { db } from '$lib/utils/database';
import { logger } from '$lib/utils/logger';

import type { GetSession, Handle, HandleError } from '@sveltejs/kit';
import type { JwtPayload } from '../models/types';

export const handleError: HandleError = async ({ error, event }) => {
	console.error(`handleError() called for ${event.request.url}`, error);
};

export const handle: Handle = async ({ event, resolve }) => {
	let setCookie: string = '';
	const jwt_secret = _config.jwtConfig.JWT_SECRET || '';

	const { accessToken, refreshToken } = cookie.parse(event.request.headers.get('cookie') || '');

	let decodedAccessToken: JwtPayload | undefined;
	let decodedRefreshToken: JwtPayload | undefined;

	let access_token_exp: number | undefined;
	let refresh_token_exp: number | undefined;

	let isAccessTokenExpired: boolean | undefined;
	let isRefreshTokenExpired: boolean | undefined;

	verify(accessToken, jwt_secret, function (err, decoded) {
		decodedAccessToken = decoded as JwtPayload;
		access_token_exp = decodedAccessToken?.exp ? decodedAccessToken?.exp * 1000 : undefined;
		isAccessTokenExpired =
			undefined !== access_token_exp ? new Date().getTime() > access_token_exp : true;
	});

	verify(refreshToken, jwt_secret, function (err, decoded) {
		decodedRefreshToken = decoded as JwtPayload;
		refresh_token_exp = decodedRefreshToken?.exp ? decodedRefreshToken?.exp * 1000 : undefined;
		isRefreshTokenExpired =
			undefined !== refresh_token_exp ? new Date().getTime() > refresh_token_exp : true;
	});
	if (undefined !== decodedAccessToken || undefined !== decodedRefreshToken) {
		logger('[hooks] ==1== <decodedAccessToken>');

		if (!isAccessTokenExpired && !isRefreshTokenExpired) {
			logger('[hooks] ==1== <access and refresh tokens are not expired so we create sessions>');
			const session = await db.user.findUnique({
				where: {
					idRefreshToken: {
						id: decodedAccessToken?.id as number,
						refreshToken: refreshToken
					}
				},
				select: { id: true, email: true }
			});

			if (session) {
				logger('[hooks] ==1==session==>', session);
				event.locals.user = { id: session.id, email: session.email };
			}
		} else if (!isAccessTokenExpired && isRefreshTokenExpired) {
			logger(
				'[hooks] ==1== <access has not expired but refresh token is expired or gone so we do nothing, user has to re-login>'
			);
			logger(event.locals);
		} else if (isAccessTokenExpired && !isRefreshTokenExpired) {
			logger(
				'[hooks] ==1== <access has expired but refresh token is not expired so we create a new access token>'
			);
			const session = await db.user.findUnique({
				where: { refreshToken: refreshToken },
				select: { id: true, email: true }
			});
			logger('[hooks] ==1== <session>:', refreshToken);

			if (session) {
				const newAccessToken = createAccessToken(session.id, session.email);
				event.locals.user = { id: session.id, email: session.email };
				setCookie = cookie.serialize('accessToken', newAccessToken, {
					// send cookie for every page
					path: '/',
					// server side only cookie so you can't use `document.cookie`
					httpOnly: true,
					// only requests from same site can send cookies and serves to protect from CSRF
					sameSite: 'strict',
					// only sent over HTTPS
					secure: _config.nodeEnv === 'production',
					// set cookie to expire after a month
					maxAge: _config.cookieConfig.COOKIE_ACCESS_MAXAGE
				});
			}
		} else {
			logger('[hooks] ==1== <all expired or nothing found>');
			const setCookie = [];
			setCookie.push(
				cookie.serialize('accessToken', '', {
					path: '/',
					// the cookie should expire immediately
					expires: new Date(0)
				})
			);
			setCookie.push(
				cookie.serialize('refreshToken', '', {
					path: '/',
					// the cookie should expire immediately
					expires: new Date(0)
				})
			);
		}
	}

	logger('[hooks] ==return==');
	logger('[hooks] ==return==>', event.locals);

	const response = await resolve(event);

	if (setCookie) {
		logger('[hooks] ==1== <We only setCookie if it is available>:', setCookie);
		response.headers.set('Set-Cookie', setCookie);
	}

	return response;
};

export const getSession: GetSession = ({ locals }) => {
	logger('[hooks] getSession==>', locals);

	if (!locals.user) return {};

	return {
		user: {
			id: locals.user.id,
			email: locals.user.email
		}
	};
};
