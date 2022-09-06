import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button } from '../../../ui/Button';
import { styled } from '../../../utils/stitches';
import { trpc } from '../../../utils/trpc';

const StyledContent = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
});

const StyledHeading = styled('h1', {
	fontSize: '$lg',
	fontWeight: '$semibold',
	marginBottom: '1.75rem'
});

export default function ExchangeCode() {
	const { query, push } = useRouter();
	const email = query.email as string | undefined;
	const code = query.code as string | undefined;

	const { mutate, isError } = trpc.useMutation('auth.exchangeCode', {
		onSuccess: () => push('/')
	});

	useEffect(() => {
		if (!email || !code) {
			return;
		}

		mutate({ email, code });
	}, [email, code]);

	return (
		<StyledContent>
			{isError ? (
				<>
					<StyledHeading>Invalid authentication code</StyledHeading>

					<Link href="/sign-in">
						<Button variant="ghost">Back to sign in</Button>
					</Link>
				</>
			) : (
				<p>Signing you in...</p>
			)}
		</StyledContent>
	);
}

ExchangeCode.layout = 'auth';
