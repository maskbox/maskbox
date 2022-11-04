import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { ReactNode } from 'react';
import { styled } from '../utils/stitches';

const StyledWrapper = styled('div', {
	background: '$landing'
});

const StyledNavbar = styled('nav', {
	position: 'relative',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	// TODO: Remove 8rem?
	padding: '1rem 8rem',
	zIndex: 100
});

const StyledLogo = styled(Link, {
	display: 'flex',
	alignItems: 'center'
});

const StyledLogoIcon = styled('div', {
	width: 18,
	height: 18,
	background: '$gray12',
	borderRadius: '50%'
});

const StyledLogoText = styled('span', {
	marginLeft: '0.75rem',
	fontSize: '$lg',
	fontWeight: '$medium'
});

const StyledNavbarGroup = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: '1.5rem'
});

const StyledSocialLink = styled(Link, {
	color: '$grayA11',
	baseTransition: 'color',
	'&:hover': {
		color: '$gray12'
	}
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
		color: '$gray12'
	}
});

const StyledFooter = styled('footer', {
	position: 'relative',
	fontSize: '$sm',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	// TODO: Remove 8rem?
	padding: '1rem 8rem',
	'&::before': {
		position: 'absolute',
		content: '',
		inset: 0,
		width: '100%',
		height: 1,
		background: 'linear-gradient(90deg, $grayA1 0%, $gray1 50%, $grayA1 100%)'
	}
});

const StyledCopyright = styled('p', {
	color: '$gray11'
});

const StyledFooterLinks = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: '1rem'
});

export default function LandingLayout({ children }: { children: ReactNode }) {
	return (
		<StyledWrapper>
			<StyledNavbar>
				<StyledLogo href="/">
					<StyledLogoIcon />
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

					<StyledSignInButton href="/sign-in">Sign in</StyledSignInButton>
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

					<StyledSocialLink
						href="https://twitter.com/usemaskbox"
						target="_blank"
						rel="noreferrer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 248 204"
						>
							<path
								fill="currentColor"
								d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
							/>
						</svg>
					</StyledSocialLink>
				</StyledFooterLinks>
			</StyledFooter>
		</StyledWrapper>
	);
}
