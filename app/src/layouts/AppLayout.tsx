import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Loading } from '../components/Loading';
import { Navbar } from '../components/Navbar';
import { Toaster } from '../components/Toaster';
import { styled } from '../utils/stitches';

const StyledAppLayout = styled('div', {
	background: '$gray1',
	height: '100vh',
	display: 'flex',
	flexDirection: 'column',
});

const StyledAppMain = styled('main', {
	margin: '0 auto',
	padding: '0 1.5rem',
	width: '100%',
	flex: '1 1 0%',
	'@xl': {
		padding: 0,
	},
});

const StyledAppContainer = styled('div', {
	margin: '0 auto',
	padding: '1.5rem 0',
	height: '100%',
	maxWidth: '70rem',
});

export default function AppLayout({ children }: { children: ReactNode }) {
	const { push } = useRouter();
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			push('/sign-in');
		},
	});

	if (status === 'loading') {
		return <Loading />;
	}

	return (
		<StyledAppLayout>
			<Navbar />

			<StyledAppMain>
				<StyledAppContainer>{children}</StyledAppContainer>
			</StyledAppMain>

			<Toaster />
		</StyledAppLayout>
	);
}
