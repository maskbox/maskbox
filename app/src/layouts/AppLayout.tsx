import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';
import { Toaster } from '../components/Toaster';
import { useSession } from '../hooks/use-session';
import { styled } from '../utils/stitches';

const StyledAppLayout = styled('div', {
	height: '100vh',
	display: 'flex',
	flexDirection: 'column'
});

const StyledAppMain = styled('main', {
	margin: '0 auto',
	padding: '0 1.5rem',
	width: '100%',
	flex: '1 1 0%',
	'@xl': {
		padding: 0
	}
});

const StyledAppContainer = styled('div', {
	margin: '0 auto',
	padding: '1.5rem 0',
	height: '100%',
	maxWidth: '70rem'
});

export default function AppLayout({ children }: { children: ReactNode }) {
	const { push } = useRouter();
	const session = useSession();

	if (!session) {
		push('/sign-in');
		return null;
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
