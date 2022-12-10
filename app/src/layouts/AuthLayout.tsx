import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Loading } from '../components/Loading';
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
	const { status } = useSession();

	if (status === 'loading') {
		return <Loading />;
	}

	if (status === 'authenticated') {
		push('/masks');
		return null;
	}

	return <StyledAuthLayout>{children}</StyledAuthLayout>;
}
