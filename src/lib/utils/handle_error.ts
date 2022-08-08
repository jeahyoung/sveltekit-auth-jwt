import { Prisma } from '@prisma/client';

export const handleErrors = (err: any) => {
	let errorMessage = 'Error';
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		if (err.code === 'P2002') {
			console.log(
				'There is a unique constraint violation, a new user cannot be created with this email'
			);
			errorMessage =
				'There is a unique constraint violation, a new user cannot be created with this email';
		}
	}

	return errorMessage;
};
