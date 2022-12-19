import { NotFoundError } from '@prisma/client/runtime';
import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from '../../../utils/hmac';
import { prisma } from '../../../utils/prisma';

export class HttpError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		if (req.method !== 'POST') {
			throw new HttpError('method not allowed', 405);
		}

		const signature = req.headers['x-signature-sha256'];
		const timestamp = req.headers['x-signature-timestamp'];

		if (!signature || !timestamp) {
			throw new HttpError('unauthorized', 401);
		}

		const message = JSON.stringify(req.body);
		const success = verify(
			message,
			signature as string,
			timestamp as string,
			process.env.SIGNATURE_SECRET_KEY as string
		);

		if (!success) {
			throw new HttpError('unauthorized', 401);
		}

		const identifier = req.body.identifier;

		if (!identifier) {
			throw new HttpError('identifier is missing', 400);
		}

		const { forwardTo } = await prisma.mask.findFirstOrThrow({
			where: {
				identifier,
			},
			select: {
				forwardTo: true,
			},
		});

		return res.json({ success: true, data: forwardTo.email });
	} catch (err) {
		if (err instanceof HttpError) {
			return res
				.status(err.statusCode)
				.send({ success: false, message: err.message });
		}

		if (err instanceof NotFoundError) {
			return res.status(404).send({ success: false, message: 'not found' });
		}

		return res
			.status(500)
			.send({ success: false, message: 'unexpected error' });
	}
}
