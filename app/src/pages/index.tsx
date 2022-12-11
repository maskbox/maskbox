import { StackIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { ReactNode } from 'react';
import { styled } from '../utils/stitches';

interface FeatureCardProps {
	title: string;
	description: string;
	icon: ReactNode;
}

const StyledTopShadow = styled('div', {
	position: 'absolute',
	width: '100%',
	height: '8rem',
	background:
		'linear-gradient(180deg, $colors$landing 0%, hsla(0, 0%, 2%, 0) 100%)',
	zIndex: 50,
	top: 0,
});

const StyledHeader = styled('div', {
	position: 'relative',
	padding: '7rem 0',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '8rem',
	zIndex: 40,
});

const StyledHeaderLogoContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: -1,
});

const StyledHeaderLogo = styled('div', {
	width: 128,
	height: 128,
	background: '$landing',
	borderRadius: '50%',
	zIndex: 40,
	boxShadow:
		'inset 0 1px 0 0 $colors$grayA8, inset 0px 0px 0px 1px $colors$grayA3',
});

const StyledBackgroundCircle = styled('div', {
	position: 'absolute',
	borderRadius: '50%',
	opacity: 0.3,
});

const StyledBackgroundGradient = styled('div', {
	position: 'absolute',
	background:
		'conic-gradient(from 180deg at 50% 50%, #FF1DDB 0deg, #0087FF 360deg)',
	borderRadius: '50%',
});

const StyledHeaderTextContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

const StyledTitle = styled('h1', {
	maxWidth: '48rem',
	fontSize: '3.75rem',
	fontWeight: '$semibold',
	lineHeight: '4.5rem',
	textAlign: 'center',
	background:
		'linear-gradient(180deg, $colors$gray12 1.5%, $colors$gray11 105%)',
	color: 'transparent',
	backgroundClip: 'text',
	textFillColor: 'transparent',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
});

const StyledDescription = styled('p', {
	maxWidth: '48rem',
	marginTop: '1.5rem',
	fontSize: '$xl',
	textAlign: 'center',
	color: '$gray11',
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
		'inset 0 1px 0 0 $colors$grayA6, inset 0px 0px 0px 1px $colors$grayA2, 0 5px 30px -5px $colors$blackA7',
});

const StyledFeaturesSection = styled('div', {
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	overflow: 'hidden',
	'&::before': {
		content: '',
		position: 'absolute',
		top: 0,
		left: 'calc(50% - 1100px/2)',
		width: 1100,
		height: 1,
		background:
			'linear-gradient(90deg, rgba(234, 234, 234, 0) 0.01%, rgba(234, 234, 234, 0.3) 48.44%, rgba(234, 234, 234, 0) 99.99%)',
		opacity: 0.6,
	},
	zIndex: 40,
});

const StyledFeaturesGradient = styled('div', {
	position: 'absolute',
	top: -35,
	width: 800,
	height: 280,
	borderRadius: 9999,
	background:
		'linear-gradient(88.93deg, #EAEAEA 0.76%, #FF27DD 14.6%, #1C94FF 87.89%, #0A0A0A 99.17%)',
	opacity: 0.3,
	filter: 'blur(150px)',
	zIndex: -1,
});

const StyledFeaturesTitle = styled('h2', {
	marginTop: '5rem',
	maxWidth: '26rem',
	fontSize: '2.25rem',
	fontWeight: '$semibold',
	lineHeight: '3rem',
	textAlign: 'center',
});

const StyledFeaturesDescription = styled('p', {
	maxWidth: '24rem',
	marginTop: '1.125rem',
	fontSize: '1.125rem',
	lineHeight: '1.5rem',
	textAlign: 'center',
	color: '$gray11',
});

const StyledFeaturesGrid = styled('div', {
	margin: '6rem 0',
	display: 'flex',
	alignItems: 'center',
	gap: '0.625rem',
});

const StyledFeatureCard = styled('div', {
	position: 'relative',
	maxWidth: '18.75rem',
	padding: '1.5rem',
	background:
		'linear-gradient(180deg, rgba(234, 234, 234, 0.024) 0%, rgba(234, 234, 234, 0) 73.44%), rgba(11, 11, 11, 0.4)',
	borderRadius: '0.75rem',
	boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.3), 0px 2px 16px rgba(0, 0, 0, 0.5)',
	overflow: 'hidden',
	'&::before': {
		content: '',
		position: 'absolute',
		width: '100%',
		height: 1,
		inset: 0,
		background:
			'linear-gradient(90deg, rgba(188, 146, 238, 0) 7.81%, rgba(188, 146, 238, 0.3) 25.52%, #BC92EE 57.81%, #BC92EE 70.31%, rgba(188, 146, 238, 0) 100%)',
		opacity: 0.15,
	},
});

const StyledFeatureIcon = styled('div', {
	width: 48,
	height: 48,
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: 'rgba(23, 23, 23, 0.5)',
	borderRadius: '50%',
});

const StyledFeatureTitle = styled('p', {
	marginTop: '1.25rem',
	fontSize: '$lg',
	fontWeight: '$semibold',
});

const StyledFeatureDescription = styled('p', {
	marginTop: '0.75rem',
	fontSize: '$lg',
	color: '$gray11',
});

const features: FeatureCardProps[] = Array.from({ length: 4 }).map(() => ({
	title: 'Lorem ipsum dolor',
	description:
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam sunt eius, quas asperiores nihil magnam molestiae autem.',
	icon: <StackIcon width="30" height="30" />,
}));

function FeatureCard({ title, description, icon }: FeatureCardProps) {
	return (
		<StyledFeatureCard>
			<StyledFeatureIcon>{icon}</StyledFeatureIcon>
			<StyledFeatureTitle>{title}</StyledFeatureTitle>
			<StyledFeatureDescription>{description}</StyledFeatureDescription>
		</StyledFeatureCard>
	);
}

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
							boxShadow: 'inset 0px 0px 0px 1px $colors$grayA3',
						}}
					/>
					<StyledBackgroundCircle
						css={{
							width: 360,
							height: 360,
							background: '$grayA3',
							boxShadow: 'inset 0px 0px 0px 1px $colors$grayA4',
						}}
					/>
					<StyledBackgroundCircle
						css={{
							width: 218,
							height: 218,
							background: '$grayA4',
							boxShadow: 'inset 0px 0px 0px 1px $colors$grayA5',
						}}
					/>

					<StyledBackgroundGradient
						css={{
							width: 380,
							height: 380,
							filter: 'blur(300px)',
						}}
					/>
					<StyledBackgroundGradient
						css={{
							width: 156,
							height: 156,
							filter: 'blur(60px)',
							opacity: 0.8,
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

			<StyledFeaturesSection>
				<StyledFeaturesGradient />

				<StyledFeaturesTitle>
					Privacy-first and features you'll love
				</StyledFeaturesTitle>
				<StyledFeaturesDescription>
					Sign up now and start enjoying the benefits.
				</StyledFeaturesDescription>

				<StyledFeaturesGrid>
					{features.map((props, i) => (
						<FeatureCard {...props} key={i} />
					))}
				</StyledFeaturesGrid>
			</StyledFeaturesSection>
		</>
	);
}

Home.layout = 'landing';
