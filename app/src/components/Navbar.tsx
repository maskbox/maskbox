import { signOut, useSession } from 'next-auth/react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { styled } from '../utils/stitches';

const StyledNavbar = styled('nav', {
	width: '100%',
	padding: '1.5rem 1.5rem 0',
	borderBottom: '1px solid $gray6',
	'@xl': {
		padding: '1.5rem 0 0',
	},
});

const NavbarContent = styled('div', {
	maxWidth: '70rem',
	margin: '0 auto',
});

const NavbarHeader = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginBottom: '1.5rem',
});

const NavbarLogo = styled(Link, {
	display: 'flex',
	alignItems: 'center',
});

const NavbarLogoText = styled('span', {
	marginLeft: '0.75rem',
	fontSize: '$lg',
	fontWeight: '$medium',
});

const NavbarUserAvatar = styled(DropdownMenuTrigger, {
	width: 32,
	height: 32,
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	verticalAlign: 'middle',
	overflow: 'hidden',
	userSelect: 'none',
	borderRadius: '50%',
	background: '$gray5',
});

const NavbarUserAvatarText = styled('span', {
	fontSize: '$sm',
	lineHeight: 1,
});

const NavbarTabs = styled('div', {
	display: 'flex',
	marginLeft: '-0.75rem',
	marginBottom: -1,
});

const StyledNavbarTab = styled(Link, {
	padding: '0.5rem 0.75rem',
	color: '$gray12',
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
							borderBottom: '1px solid $gray12',
					  }
					: undefined
			}
		/>
	);
}

export function Navbar() {
	const { data } = useSession();

	return (
		<StyledNavbar>
			<NavbarContent>
				<NavbarHeader>
					<NavbarLogo href="/masks">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M11.992.407A5.793 5.793 0 0 0 6.199 6.2v3.31a3.31 3.31 0 0 0-3.31 3.31v7.449a3.31 3.31 0 0 0 3.31 3.31h11.586a3.31 3.31 0 0 0 3.31-3.31V12.82a3.31 3.31 0 0 0-3.31-3.31V6.2c0-3.2-2.593-5.794-5.793-5.794ZM16.13 9.51V6.2a4.137 4.137 0 1 0-8.276 0v3.31h8.276Zm-4.114 8.71-.003.004-8.497-5.858 8.51 4.723 8.494-4.714-8.497 5.858-.008-.013Z"
							/>
						</svg>

						<NavbarLogoText>Maskbox</NavbarLogoText>
					</NavbarLogo>

					<DropdownMenu>
						<NavbarUserAvatar>
							<NavbarUserAvatarText>
								{data?.user?.email.slice(0, 2).toUpperCase()}
							</NavbarUserAvatarText>
						</NavbarUserAvatar>

						<DropdownMenuContent>
							<DropdownMenuItem
								css={{ color: '$red11' }}
								onClick={() => signOut()}
							>
								Sign out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</NavbarHeader>

				<NavbarTabs>
					<NavbarTab href="/masks">Masks</NavbarTab>
					<NavbarTab href="/emails">Emails</NavbarTab>
				</NavbarTabs>
			</NavbarContent>
		</StyledNavbar>
	);
}
