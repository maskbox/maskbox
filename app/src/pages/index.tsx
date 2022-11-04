import Link from 'next/link';
import { styled } from '../utils/stitches';

const StyledTopShadow = styled('div', {
	position: 'absolute',
	width: '100%',
	height: '8rem',
	background:
		'linear-gradient(180deg, $colors$landing 0%, hsla(0, 0%, 2%, 0) 100%)',
	zIndex: 50,
	top: 0
});

const StyledHeader = styled('div', {
	position: 'relative',
	padding: '7rem 0',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '8rem',
	zIndex: 40
});

const StyledHeaderLogoContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: -1
});

const StyledHeaderLogo = styled('div', {
	width: 128,
	height: 128,
	background: '$landing',
	borderRadius: '50%',
	zIndex: 40,
	boxShadow:
		'inset 0 1px 0 0 $colors$grayA8, inset 0px 0px 0px 1px $colors$grayA3'
});

const StyledBackgroundCircle = styled('div', {
	position: 'absolute',
	borderRadius: '50%',
	opacity: 0.3
});

const StyledBackgroundGradient = styled('div', {
	position: 'absolute',
	background:
		'conic-gradient(from 180deg at 50% 50%, #FF1DDB 0deg, #0087FF 360deg)',
	borderRadius: '50%'
});

const StyledHeaderTextContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
});

const StyledTitle = styled('h1', {
	maxWidth: '48rem',
	fontSize: '3.75rem',
	fontWeight: '$bold',
	lineHeight: '4.5rem',
	textAlign: 'center',
	background:
		'linear-gradient(180deg, $colors$gray12 1.5%, $colors$gray11 105%)',
	color: 'transparent',
	backgroundClip: 'text',
	textFillColor: 'transparent',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent'
});

const StyledDescription = styled('p', {
	maxWidth: '48rem',
	marginTop: '1.5rem',
	fontSize: '$xl',
	textAlign: 'center',
	color: '$gray11'
});

const StyledStartNowButton = styled(Link, {
	marginTop: '4rem',
	padding: '0.75rem 1rem',
	fontSize: '$lg',
	fontWeight: '$semibold',
	background:
		'linear-gradient(180deg, $grayA2 0%, hsla(0, 0%, 93%, 0) 50%), $grayA2',
	borderRadius: '0.75rem',
	boxShadow:
		'inset 0 1px 0 0 $colors$grayA6, inset 0px 0px 0px 1px $colors$grayA2, 0 5px 30px -5px $colors$blackA7'
});

export default function Home() {
	return (
		<>
			<StyledTopShadow />

			<StyledHeader>
				<StyledHeaderLogoContainer>
					<StyledBackgroundCircle
						css={{
							width: 568,
							height: 568,
							background: '$grayA2',
							boxShadow: 'inset 0px 0px 0px 1px $colors$grayA3'
						}}
					/>
					<StyledBackgroundCircle
						css={{
							width: 360,
							height: 360,
							background: '$grayA3',
							boxShadow: 'inset 0px 0px 0px 1px $colors$grayA4'
						}}
					/>
					<StyledBackgroundCircle
						css={{
							width: 218,
							height: 218,
							background: '$grayA4',
							boxShadow: 'inset 0px 0px 0px 1px $colors$grayA5'
						}}
					/>

					<StyledBackgroundGradient
						css={{
							width: 380,
							height: 380,
							filter: 'blur(300px)'
						}}
					/>
					<StyledBackgroundGradient
						css={{
							width: 156,
							height: 156,
							filter: 'blur(60px)',
							opacity: 0.8
						}}
					/>

					<StyledHeaderLogo />
				</StyledHeaderLogoContainer>

				<StyledHeaderTextContainer>
					<StyledTitle>Keep your online identity hidden and secure</StyledTitle>
					<StyledDescription>
						Maskbox protects your real email addresses from internet strangers
						and automatically forwards messages to your inbox.
					</StyledDescription>

					<StyledStartNowButton href="/sign-in">
						Start now for free
					</StyledStartNowButton>
				</StyledHeaderTextContainer>
			</StyledHeader>
		</>
	);
}

Home.layout = 'landing';
