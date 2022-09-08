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
	const { push } = useRouter();
	const session = useSession();

	if (session) {
		push('/masks');
		return null;
	}

	return <StyledAuthLayout>{children}</StyledAuthLayout>;
}
