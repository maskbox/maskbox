import { add, isPast } from 'date-fns';
import { z } from 'zod';
import { SESSION_COOKIE_NAME } from '../../constants';
import { setCookie } from '../../utils/cookie';
import { prisma } from '../../utils/prisma';
import { emailSchema } from '../../utils/schema';
import { createRouter } from '../create-router';

const SIGN_IN_CODE_EXPIRATION = 5;

export const authRouter = createRouter()
	.query('getSession', {
		async resolve({ ctx }) {
			if (!ctx.session?.userId) {
				return;
			}

			const { id, email } = await prisma.user.findUniqueOrThrow({
				where: {
					id: ctx.session.userId
				}
			});

			return { id, email };
		}
	})
	.mutation('challenge', {
		input: emailSchema,
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
	})
	.mutation('exchangeCode', {
		input: z.object({
			email: z.string().email(),
			code: z.string().cuid()
		}),
		async resolve({ input, ctx }) {
			const code = await prisma.authenticationCode.findUniqueOrThrow({
				where: {
					code_email: {
						email: input.email,
						code: input.code
					}
				}
			});

			await prisma.authenticationCode.delete({
				where: {
					code_email: {
						email: code.email,
						code: code.code
					}
				}
			});

			if (isPast(code.expiresAt)) {
				throw new Error('No AuthenticationCode found');
			}

			let user = await prisma.user.findUnique({
				where: {
					email: code.email
				}
			});

			if (!user) {
				user = await prisma.user.create({
					data: {
						email: code.email,
						emails: {
							create: {
								email: code.email,
								verifiedAt: new Date()
							}
						}
					}
				});
			}

			const session = await prisma.session.create({
				data: {
					userId: user.id
				}
			});

			// TODO: Add session expiration:
			setCookie(ctx.res, {
				name: SESSION_COOKIE_NAME,
				value: session.token,
				path: '/',
				sameSite: 'lax',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production'
			});

			return { id: user.id, email: user.email };
		}
	});
