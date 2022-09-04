import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { trpc } from '../../../utils/trpc';

export default function ExchangeCode() {
	const { query, push } = useRouter();
	const email = query.email as string | undefined;
	const code = query.code as string | undefined;

	const { mutate } = trpc.useMutation('auth.exchangeCode', {
		onSuccess: () => push('/')
	});

	useEffect(() => {
		if (!email || !code) {
			return;
		}

		mutate({ email, code });
	}, [email, code]);

	// TODO: Catch errors:
	return <p>Signing you in...</p>;
}
