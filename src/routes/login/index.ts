import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt-updated';
import * as cookie from 'cookie';
import validator from 'validator';
import { db } from '$lib/database';
import { createAccessToken, createRefreshToken, maxAge } from '$lib/jwt';

export const post: RequestHandler = async ({ request }) => {
	const form = await request.formData();
	const email = form.get('email');
	const password = form.get('password');

	if (typeof email !== 'string' || typeof password !== 'string') {
		return {
			status: 400,
			body: {
				error: 'Enter a valid username and password.'
			}
		};
	}

	if (!email || !password) {
		return {
			status: 400,
			body: {
				error: 'Username and password are required.'
			}
		};
	}

	if (!validator.isEmail(email)) {
		return {
			status: 400,
			body: {
				error: 'Please enter a valied email.'
			}
		};
	}

	const user = await db.user.findUnique({
		where: { email }
	});

	const passwordMatch = user && (await bcrypt.compare(password, user.password));

	if (!user || !passwordMatch) {
		return {
			status: 400,
			body: {
				error: 'You entered the wrong credentials.'
			}
		};
	}

	const refreshToken = createRefreshToken();
	const accessToken = createAccessToken(user.id, user.email);

	const updateUser = await db.user.update({
		where: {
			id: user.id
		},
		data: {
			refreshToken: refreshToken
		}
	});

	const cookies = [];
	cookies.push(
		cookie.serialize('accessToken', accessToken, {
			// send cookie for every page
			path: '/',
			// server side only cookie so you can't use `document.cookie`
			httpOnly: true,
			// only requests from same site can send cookies and serves to protect from CSRF
			sameSite: 'strict',
			// only sent over HTTPS
			secure: process.env.NODE_ENV === 'production',
			// set cookie to expire after a month
			maxAge: 60 * 60 * 1
		})
	);
	cookies.push(
		cookie.serialize('refreshToken', refreshToken, {
			// send cookie for every page
			path: '/',
			// server side only cookie so you can't use `document.cookie`
			httpOnly: true,
			// only requests from same site can send cookies and serves to protect from CSRF
			sameSite: 'strict',
			// only sent over HTTPS
			secure: process.env.NODE_ENV === 'production',
			// set cookie to expire after a month
			maxAge: maxAge * 14
		})
	);
	return {
		status: 200,
		body: {
			data: { email },
			success: 'Success.'
		},
		headers: {
			'Set-Cookie': cookies
		}
	};
};
