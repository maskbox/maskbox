import { z } from 'zod';
import { RELAY_DOMAIN } from '../constants';

export const ALGORITHMS = ['PERSON', 'RANDOM'] as const;

export const emailStringSchema = z
	.string()
	.email('Please enter a valid email address.')
	.refine(
		(val) => val.split('@')[1] !== RELAY_DOMAIN,
		'You cannot use email address with this domain.'
	);

export const emailStringSchemaWithDisposableEmailCheck =
	emailStringSchema.refine(
		async (val) => await checkDisposableEmail(val),
		'You cannot use email address with this domain.'
	);

export const emailSchema = z.object({
	email: emailStringSchema,
});

export const emailSchemaWithDisposableEmailCheck = z.object({
	email: emailStringSchemaWithDisposableEmailCheck,
});

export const maskSchema = z.object({
	forwardTo: z.string().cuid(),
	algorithm: z.enum(ALGORITHMS),
	name: z.preprocess((val) => {
		if (typeof val !== 'string') {
			return val;
		}

		return val.trim();
	}, z.string().max(32, 'Name cannot be longer than 32 characters.').nullable()),
});

async function checkDisposableEmail(email: string) {
	const res = await fetch(
		`${process.env.DISPOSABLE_EMAIL_CHECKER_URL}/${email}`
	);

	if (!res.ok) {
		return false;
	}

	const { disposable } = (await res.json()) as {
		disposable: boolean;
	};

	return !disposable;
}
