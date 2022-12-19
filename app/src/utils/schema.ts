import { z } from 'zod';

export const ALGORITHMS = ['PERSON', 'RANDOM'] as const;

export const emailSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address.' }),
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
