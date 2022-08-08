import type { RequestHandler } from '@sveltejs/kit';
import validator from 'validator';
import * as bcrypt from 'bcrypt-updated';
import * as cookie from 'cookie';
import _config from '../../../config';

import { handleErrors } from '$lib/utils/handle_error';
import { db } from '$lib/utils/database';
import { createRefreshToken } from '$lib/utils/jwt';
import { logger } from '$lib/utils/logger';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	logger('SignUp/formData==>', formData);
	const email = formData.get('email');
	const password = formData.get('password');

	if (typeof email !== 'string' || typeof password !== 'string') {
		return {
			status: 400,
			body: {
				error: 'Something went wrong.'
			}
		};
	}

	if (!email || !password) {
		return {
			status: 400,
			body: {
				error: 'email and Password is required.'
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

	// try {
		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);
		const refreshToken = createRefreshToken();
		let user = {
			email,
			password: passwordHash,
			refreshToken
		};

		const createUser = await db.user.create({ data: user });
		logger("SignUp/index.ts: createUser",createUser);
		if (createUser) {
			return {
				status: 201,
				body: {
					success: 'Success',
					data: createUser
				}
			};
		} else {
			logger('SignUp/index.ts: Exist user');
			return {
				status: 400,
				body: {
					error: 'User is already exist.'
				}
			};
		}
	// } catch (error) {
	// 	const errorMessage = handleErrors(error);
	// 	return {
	// 		status: 400,
	// 		body: {
	// 			error: errorMessage
	// 		}
	// 	};
	// }

	return {};
};
