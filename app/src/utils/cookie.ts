import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiResponse } from 'next';

export function setCookie(
	res: NextApiResponse,
	cookie: { name: string; value: string } & CookieSerializeOptions
) {
	let cookies = (res.getHeader('Set-Cookie') as string | string[]) ?? [];

	if (!Array.isArray(cookies)) {
		cookies = [cookies];
	}

	const { name, value, ...options } = cookie;
	const cookieHeader = serialize(name, value, options);

	cookies.push(cookieHeader);

	res.setHeader('Set-Cookie', cookies);
}
