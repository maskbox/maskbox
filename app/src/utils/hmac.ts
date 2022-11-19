import crypto from 'crypto';
import { SIGNATURE_TIMEOUT } from '../constants';

export function verify(
	message: string,
	signature: string,
	timestamp: string,
	secretKey: string
): boolean {
	const signatureTimestamp = Number(timestamp);
	const difference = Math.abs(Date.now() - signatureTimestamp);

	if (difference > SIGNATURE_TIMEOUT) {
		return false;
	}

	const hmac = crypto
		.createHmac('sha256', secretKey)
		.update(timestamp + message)
		.digest('hex');

	return crypto.timingSafeEqual(
		Buffer.from(hmac, 'hex'),
		Buffer.from(signature, 'hex')
	);
}
