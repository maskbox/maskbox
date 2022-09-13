import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';
import { Toaster } from '../components/Toaster';
import { useSession } from '../hooks/use-session';
import { styled } from '../utils/stitches';

const StyledAppLayout = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minHeight: '100vh'
});

const StyledAppMain = styled('main', {
	display: 'flex',
	flexDirection: 'column',
	flex: '1 1 0%',
	width: '100%',
	maxWidth: '70rem',
	marginTop: '2rem'
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

			<StyledAppMain>{children}</StyledAppMain>

			<Toaster />
		</StyledAppLayout>
	);
}
