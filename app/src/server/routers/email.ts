import { createProtectedRouter } from '../create-router';
import { prisma } from '../../utils/prisma';

export const emailRouter = createProtectedRouter().query('getMyEmails', {
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
});
