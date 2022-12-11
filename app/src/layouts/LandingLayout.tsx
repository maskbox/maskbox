import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { ReactNode } from 'react';
import { styled } from '../utils/stitches';

const StyledWrapper = styled('div', {
	background: '$landing',
});

const StyledNavbar = styled('nav', {
	position: 'relative',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	// TODO: Remove 8rem?
	padding: '1rem 8rem',
	zIndex: 100,
});

const StyledLogo = styled(Link, {
	display: 'flex',
	alignItems: 'center',
});

const StyledLogoIcon = styled('div', {
	width: 18,
	height: 18,
	background: '$gray12',
	borderRadius: '50%',
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
	// TODO: Remove 8rem?
	padding: '1.5rem 8rem',
	'&::before': {
		position: 'absolute',
		content: '',
		inset: 0,
		width: '100%',
		height: 1,
		background: 'linear-gradient(90deg, $grayA1 0%, $gray1 50%, $grayA1 100%)',
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
				</StyledFooterLinks>
			</StyledFooter>
		</StyledWrapper>
	);
}
