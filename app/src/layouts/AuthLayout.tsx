import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useSession } from '../hooks/use-session';
import { styled } from '../utils/stitches';
import puff from '../../public/puff.svg';

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
				<Image src={puff} width="80" height="80" />
			</StyledAuthLayout>
		);
	}

	if (isSuccess) {
		push('/masks');
		return null;
	}

	return <StyledAuthLayout>{children}</StyledAuthLayout>;
}
