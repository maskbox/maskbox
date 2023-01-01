import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { TRPCError } from '@trpc/server';
import crypto from 'crypto';
import { z } from 'zod';
import sendMail from '../../../emails';
import Default from '../../../emails/Default';
import {
	EMAIL_VERIFICATION_MAX_AGE,
	MAX_EMAILS_PER_ACCOUNT,
} from '../../constants';
import { prisma } from '../../utils/prisma';
import { emailSchemaWithDisposableEmailCheck } from '../../utils/schema';
import { protectedProcedure, router } from '../trpc';

export const emailRouter = router({
	getEmails: protectedProcedure
		.input(
			z
				.object({
					onlyVerified: z.boolean(),
				})
				.default({
					onlyVerified: false,
				})
		)
		.query(async ({ ctx, input }) => {
			const emails = await prisma.email.findMany({
				where: {
					userId: ctx.session.user.id,
					verifiedAt: {
						not: input.onlyVerified ? null : undefined,
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
			});

			return emails;
		}),
	addEmail: protectedProcedure
		.input(emailSchemaWithDisposableEmailCheck)
		.mutation(async ({ ctx, input }) => {
			const count = await prisma.email.count({
				where: {
					userId: ctx.session.user.id,
				},
			});

			if (count >= MAX_EMAILS_PER_ACCOUNT) {
				throw new TRPCError({
					code: 'CONFLICT',
					message: 'You reached the limit of maximum emails per account.',
				});
			}

			const token = crypto.randomBytes(32).toString('hex');

			try {
				const email = await prisma.email.create({
					data: {
						email: input.email,
						user: {
							connect: {
								id: ctx.session.user.id,
							},
						},
						emailVerificationToken: {
							create: {
								token,
								expires: new Date(Date.now() + EMAIL_VERIFICATION_MAX_AGE),
							},
						},
					},
				});

				sendMail({
					to: email.email,
					subject: 'Email address verification',
					component: (
						<Default
							title="Email address verification"
							body={
								<>
									Please click the button below to verify your newly added email
									address <strong>{email.email}</strong>.
								</>
							}
							buttonText="Verify email address"
							buttonHref={`${process.env.NEXTAUTH_URL}/api/verify/${token}`}
						/>
					),
				});

				return email;
			} catch (e) {
				if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
					throw new TRPCError({
						code: 'CONFLICT',
						message: 'Email address is already in use.',
					});
				}

				throw e;
			}
		}),
	deleteEmail: protectedProcedure
		.input(
			z.object({
				id: z.string().cuid(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const emailToDelete = await prisma.email.findFirst({
				where: {
					id: input.id,
					userId: ctx.session.user.id,
					NOT: {
						email: {
							equals: ctx.session.user.email,
						},
					},
				},
			});

			if (!emailToDelete) {
				throw new TRPCError({
					code: 'CONFLICT',
					message: 'Primary email cannot be removed.',
				});
			}

			const deletedEmail = await prisma.email.delete({
				where: {
					id: emailToDelete.id,
				},
			});

			return deletedEmail;
		}),
});
