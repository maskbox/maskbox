import * as trpc from '@trpc/server';
import { z } from 'zod';
import { MAX_EMAILS_PER_ACCOUNT } from '../../constants';
import { prisma } from '../../utils/prisma';
import { emailSchema } from '../../utils/schema';
import { createProtectedRouter } from '../create-router';

export const emailRouter = createProtectedRouter()
	.query('getEmails', {
		input: z
			.object({
				onlyVerified: z.boolean()
			})
			.default({
				onlyVerified: false
			}),
		async resolve({ ctx, input }) {
			const emails = await prisma.email.findMany({
				where: {
					userId: ctx.session.userId,
					verifiedAt: {
						not: input.onlyVerified ? null : undefined
					}
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
			const count = await prisma.email.count({
				where: {
					userId: ctx.session.userId
				}
			});

			if (count >= MAX_EMAILS_PER_ACCOUNT) {
				throw new trpc.TRPCError({
					code: 'CONFLICT',
					message: 'You reached the limit of maximum emails per account.'
				});
			}

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
		async resolve({ ctx, input }) {
			// TODO: Disable deleting the last email.
			const emailToDelete = await prisma.email.findFirstOrThrow({
				where: {
					id: input.id,
					userId: ctx.session.userId
				}
			});

			const deletedEmail = await prisma.email.delete({
				where: {
					id: emailToDelete.id
				}
			});

			return deletedEmail;
		}
	});
