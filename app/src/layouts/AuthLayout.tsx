import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useSession } from '../hooks/use-session';
import { styled } from '../utils/stitches';

const StyledAuthLayout = styled('main', {
	background: '$gray1',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '100vh',
	padding: '0 1.5rem',
	'@sm': {
		padding: 0
	}
});

export default function AuthLayout({ children }: { children: ReactNode }) {
	const { push } = useRouter();
	const session = useSession();

	if (session) {
		push('/masks');
		return null;
	}

	return <StyledAuthLayout>{children}</StyledAuthLayout>;
}
