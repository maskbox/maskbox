import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = req.query.token;

	if (!token) {
		return res.redirect('/');
	}

	const emailVerificationToken =
		await prisma.emailVerificationToken.findUniqueOrThrow({
			where: {
				token: token as string
			},
			select: {
				token: true,
				expires: true,
				emailId: true
			}
		});

	await prisma.emailVerificationToken.delete({
		where: {
			token: emailVerificationToken.token
		}
	});

	if (emailVerificationToken.expires.getTime() < Date.now()) {
		return res.redirect('/emails');
	}

	await prisma.email.update({
		where: {
			id: emailVerificationToken.emailId
		},
		data: {
			verifiedAt: new Date()
		}
	});

	return res.redirect('/emails');
}
