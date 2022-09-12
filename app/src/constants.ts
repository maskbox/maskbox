export const SESSION_COOKIE_NAME = `${
	process.env.NODE_ENV === 'production' ? '__Secure-' : ''
}sid`;

export const MAX_EMAILS_PER_ACCOUNT = 4;
export const MAX_MASKS_PER_ACCOUNT = 24;
