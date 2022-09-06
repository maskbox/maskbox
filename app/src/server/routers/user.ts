import { createProtectedRouter } from '../create-router';
import { prisma } from '../../utils/prisma';

export const userRouter = createProtectedRouter().query('getMe', {
	async resolve({ ctx }) {
		const { id, email } = await prisma.user.findUniqueOrThrow({
			where: {
				id: ctx.session.userId
			}
		});

		return { id, email };
	}
});
