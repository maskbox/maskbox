import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useSession } from '../hooks/use-session';
import { styled } from '../utils/stitches';

const StyledAuthLayout = styled('main', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '100vh'
});

export default function AuthLayout({ children }: { children: ReactNode }) {
	const { query, push } = useRouter();
	const { isLoading, isSuccess } = useSession();

	if (isLoading) {
		return <p>Loading auth...</p>;
	}

	if (isSuccess) {
		push(
			query.redirect ? decodeURIComponent(query.redirect as string) : '/masks'
		);
		return null;
	}

	return <StyledAuthLayout>{children}</StyledAuthLayout>;
}
