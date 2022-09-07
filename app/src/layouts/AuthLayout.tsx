import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Puff } from 'react-loading-icons';
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
	const { isLoading, isSuccess } = useSession();

	if (isLoading) {
		return (
			<StyledAuthLayout>
				<Puff width="80" height="80" />
			</StyledAuthLayout>
		);
	}

	if (isSuccess) {
		push('/masks');
		return null;
	}

	return <StyledAuthLayout>{children}</StyledAuthLayout>;
}
