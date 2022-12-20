import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { styled } from '../utils/stitches';

const StyledWrapper = styled('div', {
	background: '$landing',
	overflow: 'hidden',
});

const StyledNavbar = styled('nav', {
	position: 'relative',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '1rem 1.5rem',
	zIndex: 100,
	'@md': {
		padding: '1rem 3rem',
	},
	'@xl': {
		padding: '1rem 8rem',
	},
});

const StyledLogo = styled(Link, {
	display: 'flex',
	alignItems: 'center',
});

const StyledLogoText = styled('span', {
	marginLeft: '0.75rem',
	fontSize: '$lg',
	fontWeight: '$medium',
});

const StyledNavbarGroup = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: '1.5rem',
});

const StyledSocialLink = styled(Link, {
	color: '$grayA11',
	baseTransition: 'color',
	'&:hover': {
		color: '$gray12',
	},
});

const StyledSignInButton = styled(Link, {
	padding: '0.375rem 1rem',
	fontWeight: '$medium',
	background: '$grayA2',
	color: '$grayA11',
	borderRadius: '0.5rem',
	baseTransition: 'background, color',
	'&:hover': {
		background: '$grayA3',
		color: '$gray12',
	},
});

const StyledFooter = styled('footer', {
	position: 'relative',
	fontSize: '$sm',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '1rem 1.5rem',
	'&::before': {
		position: 'absolute',
		content: '',
		inset: 0,
		width: '100%',
		height: 1,
		background: 'linear-gradient(90deg, $grayA1 0%, $gray1 50%, $grayA1 100%)',
	},
	'@md': {
		padding: '1rem 3rem',
	},
	'@xl': {
		padding: '1rem 8rem',
	},
});

const StyledCopyright = styled('p', {
	color: '$gray11',
});

const StyledFooterLinks = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
});

export default function LandingLayout({ children }: { children: ReactNode }) {
	const { data } = useSession();

	return (
		<StyledWrapper>
			<Analytics />
			<StyledNavbar>
				<StyledLogo href="/">
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

					<StyledLogoText>Maskbox</StyledLogoText>
				</StyledLogo>

				<StyledNavbarGroup>
					<StyledSocialLink
						href="https://github.com/maskbox/maskbox"
						target="_blank"
						rel="noreferrer"
					>
						<GitHubLogoIcon width="16" height="16" />
					</StyledSocialLink>

					{data ? (
						<StyledSignInButton href="/masks">Open app</StyledSignInButton>
					) : (
						<StyledSignInButton href="/sign-in">Sign in</StyledSignInButton>
					)}
				</StyledNavbarGroup>
			</StyledNavbar>

			<main>{children}</main>

			<StyledFooter>
				<StyledCopyright>Copyright © 2022 Maskbox</StyledCopyright>
				<StyledFooterLinks>
					<StyledSocialLink
						href="https://github.com/maskbox/maskbox"
						target="_blank"
						rel="noreferrer"
					>
						<GitHubLogoIcon width="16" height="16" />
					</StyledSocialLink>
				</StyledFooterLinks>
			</StyledFooter>
		</StyledWrapper>
	);
}
