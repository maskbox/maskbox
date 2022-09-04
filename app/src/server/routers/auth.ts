import { createRouter } from '../create-router';
import { prisma } from '../../utils/prisma';
import { add } from 'date-fns';
import { authChallengeSchema } from '../../utils/schema';

const SIGN_IN_CODE_EXPIRATION = 5;

export const authRouter = createRouter().mutation('challenge', {
	input: authChallengeSchema,
	async resolve({ input }) {
		const code = await prisma.authenticationCode.create({
			data: {
				email: input.email,
				expiresAt: add(new Date(), { minutes: SIGN_IN_CODE_EXPIRATION })
			}
		});

		// TODO: Send a sign-in link to the user's email.
		console.log({ code });

		return { email: code.email };
	}
});
