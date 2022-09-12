import { randAlphaNumeric, randFirstName, randLastName } from '@ngneat/falso';
import * as trpc from '@trpc/server';
import { prisma } from '../../utils/prisma';
import { ALGORITHMS, maskSchema } from '../../utils/schema';
import { createProtectedRouter } from '../create-router';

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

export const maskRouter = createProtectedRouter()
	.query('getMasks', {
		async resolve({ ctx }) {
			const masks = await prisma.mask.findMany({
				where: {
					userId: ctx.session.userId
				},
				include: {
					forwardTo: true
				},
				orderBy: {
					createdAt: 'desc'
				}
			});

			return masks;
		}
	})
	.mutation('addMask', {
		input: maskSchema,
		async resolve({ ctx, input }) {
			const forwardToEmail = await prisma.email.findFirstOrThrow({
				where: {
					id: input.forwardTo,
					userId: ctx.session.userId
				},
				select: {
					id: true,
					verifiedAt: true
				}
			});

			if (!forwardToEmail.verifiedAt) {
				throw new trpc.TRPCError({
					code: 'BAD_REQUEST',
					message: 'Email is not verified'
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
							id: ctx.session.userId
						}
					}
				},
				include: {
					forwardTo: true
				}
			});

			return mask;
		}
	});
