import { createProtectedRouter } from '../create-router';
import { prisma } from '../../utils/prisma';
import { emailSchema } from '../../utils/schema';
import { z } from 'zod';

export const emailRouter = createProtectedRouter()
	.query('getEmails', {
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
	.mutation('addEmail', {
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
	})
	.mutation('deleteEmail', {
		input: z.object({
			id: z.string().cuid()
		}),
		async resolve({ input }) {
			// TODO: Check if it is a user owner of the email.
			// TODO: Disable deleting the last email.
			const email = await prisma.email.delete({
				where: {
					id: input.id
				}
			});

			return email;
		}
	});
