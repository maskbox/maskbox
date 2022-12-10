import { randAlphaNumeric, randFirstName, randLastName } from '@ngneat/falso';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { MAX_MASKS_PER_ACCOUNT } from '../../constants';
import { prisma } from '../../utils/prisma';
import { ALGORITHMS, maskSchema } from '../../utils/schema';
import { protectedProcedure, router } from '../trpc';

function generateIdentifier(algorithm: typeof ALGORITHMS[number]) {
	let identifier;

	switch (algorithm) {
		case 'PERSON': {
			const firstName = randFirstName({ withAccents: false }).toLowerCase();
			const lastName = randLastName({ withAccents: false }).toLowerCase();

			identifier = `${firstName}.${lastName}`;
			break;
		}
		case 'RANDOM': {
			identifier = randAlphaNumeric({ length: 16 }).join('');
			break;
		}
	}

	return identifier;
}

export const maskRouter = router({
	getMasks: protectedProcedure.query(async ({ ctx }) => {
		const masks = await prisma.mask.findMany({
			where: {
				userId: ctx.session.user.id
			},
			include: {
				forwardTo: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		return masks;
	}),
	addMask: protectedProcedure
		.input(maskSchema)
		.mutation(async ({ ctx, input }) => {
			const count = await prisma.mask.count({
				where: {
					userId: ctx.session.user.id
				}
			});

			if (count >= MAX_MASKS_PER_ACCOUNT) {
				throw new TRPCError({
					code: 'CONFLICT',
					message: 'You reached the limit of maximum masks per account.'
				});
			}

			const forwardToEmail = await prisma.email.findFirstOrThrow({
				where: {
					id: input.forwardTo,
					userId: ctx.session.user.id
				},
				select: {
					id: true,
					verifiedAt: true
				}
			});

			if (!forwardToEmail.verifiedAt) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Email is not verified.'
				});
			}

			const mask = await prisma.mask.create({
				data: {
					identifier: generateIdentifier(input.algorithm),
					forwardTo: {
						connect: {
							id: forwardToEmail.id
						}
					},
					name: input.name,
					user: {
						connect: {
							id: ctx.session.user.id
						}
					}
				},
				include: {
					forwardTo: true
				}
			});

			return mask;
		}),
	deleteMask: protectedProcedure
		.input(
			z.object({
				id: z.string().cuid()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const maskToDelete = await prisma.mask.findFirstOrThrow({
				where: {
					id: input.id,
					userId: ctx.session.user.id
				}
			});

			const deletedMask = await prisma.mask.delete({
				where: {
					id: maskToDelete.id
				}
			});

			return deletedMask;
		})
});
