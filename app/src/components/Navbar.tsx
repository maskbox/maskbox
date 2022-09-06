import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useSession } from '../hooks/use-session';
import { styled } from '../utils/stitches';

const DummyLogoIcon = styled('div', {
	width: 32,
	height: 32,
	background: '$gray12',
	borderRadius: '50%'
});

const StyledNavbar = styled('nav', {
	width: '100%',
	paddingTop: '1.5rem',
	borderBottom: '1px solid $gray6'
});

const NavbarContent = styled('div', {
	maxWidth: '70rem',
	margin: '0 auto'
});

const NavbarHeader = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginBottom: '0.75rem'
});

const NavbarLogo = styled(Link, {
	display: 'flex',
	alignItems: 'center'
});

const NavbarLogoText = styled('span', {
	marginLeft: '0.75rem',
	fontSize: '$lg',
	fontWeight: '$medium'
});

const NavbarTabs = styled('div', {
	display: 'flex',
	marginLeft: '-0.75rem',
	marginBottom: -1
});

const StyledNavbarTab = styled(Link, {
	padding: '0.5rem 0.75rem',
	color: '$gray12'
});

function NavbarTab(props: LinkProps & { children: ReactNode }) {
	const { asPath } = useRouter();

	return (
		<StyledNavbarTab
			{...props}
			css={
				asPath === props.href
					? {
							fontWeight: '$semibold',
							borderBottom: '1px solid $gray12'
					  }
					: undefined
			}
		/>
	);
}

export function Navbar() {
	const { session } = useSession();

	return (
		<StyledNavbar>
			<NavbarContent>
				<NavbarHeader>
					<NavbarLogo href="/masks">
						<DummyLogoIcon />
						<NavbarLogoText>Maskbox</NavbarLogoText>
					</NavbarLogo>

					<p>{session?.email}</p>
				</NavbarHeader>

				<NavbarTabs>
					<NavbarTab href="/masks">Masks</NavbarTab>
				</NavbarTabs>
			</NavbarContent>
		</StyledNavbar>
	);
}
