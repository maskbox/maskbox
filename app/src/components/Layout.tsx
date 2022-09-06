import { ReactNode } from 'react';
import { styled } from '../utils/stitches';
import { Navbar } from './Navbar';

export const AuthLayout = styled('main', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '100vh'
});

export const MarketingLayout = styled('main');

const StyledAppLayout = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
});

const StyledAppMain = styled('main', {
	width: '100%',
	maxWidth: '70rem',
	marginTop: '1.25rem'
});

export function AppLayout({ children }: { children: ReactNode }) {
	return (
		<StyledAppLayout>
			<Navbar />

			<StyledAppMain>{children}</StyledAppMain>
		</StyledAppLayout>
	);
}
