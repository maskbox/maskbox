import { createProtectedRouter } from '../create-router';
import { prisma } from '../../utils/prisma';
import { emailSchema } from '../../utils/schema';

export const emailRouter = createProtectedRouter()
	.query('getMyEmails', {
		async resolve({ ctx }) {
			const emails = await prisma.email.findMany({
				where: {
					userId: ctx.session.userId
				},
				orderBy: {
					createdAt: 'desc'
				}
			});

			return emails;
		}
	})
	.mutation('newEmail', {
		input: emailSchema,
		async resolve({ ctx, input }) {
			const email = await prisma.email.create({
				data: {
					email: input.email,
					user: {
						connect: {
							id: ctx.session.userId
						}
					}
				}
			});

			// TODO: Send a verification email.

			return email;
		}
	});
