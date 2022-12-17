import { StackIcon } from '@radix-ui/react-icons';
import * as Tabs from '@radix-ui/react-tabs';
import { motion, useInView } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { ReactNode, useRef } from 'react';
import { styled } from '../utils/stitches';
import email from '../../public/email.png';
import masks from '../../public/masks.png';
import usage from '../../public/usage.png';

interface FeatureCardProps {
	title: string;
	description: string;
	icon: ReactNode;
}

const DEFAULT_EASE = [0.21, 0.47, 0.32, 0.98];

const fadeInVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
};

const fadeInDownVariants = {
	hidden: {
		opacity: 0,
		y: '-10px',
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};

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
	minHeight: '100vh',
	position: 'relative',
	padding: '7rem 0',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '8rem',
	zIndex: 40,
});

const StyledHeaderLogoContainer = styled(motion.div, {
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

const StyledTitle = styled(motion.h1, {
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

const StyledDescription = styled(motion.p, {
	maxWidth: '48rem',
	marginTop: '1.5rem',
	fontSize: '$xl',
	textAlign: 'center',
	color: '$gray11',
});

const StyledStartNowButton = styled(motion.a, {
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

const StyledSectionTitle = styled(motion.h2, {
	maxWidth: '26rem',
	fontSize: '2.25rem',
	fontWeight: '$semibold',
	lineHeight: '3rem',
	textAlign: 'center',
});

const StyledSectionDescription = styled(motion.p, {
	maxWidth: '24rem',
	marginTop: '1.125rem',
	fontSize: '1.125rem',
	lineHeight: '1.5rem',
	textAlign: 'center',
	color: '$gray11',
});

const StyledHowItWorksSection = styled('div', {
	marginBottom: '15rem',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
});

const StyledTabsRoot = styled(motion.div, {
	maxWidth: '82.5rem',
	marginTop: '6rem',
	display: 'grid',
	gridTemplateColumns: '1fr 1.5fr',
	alignItems: 'center',
	gap: '5rem',
	zIndex: 40,
});

const StyledTabsList = styled(Tabs.List, {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'start',
	gap: '2.5rem',
});

const StyledTabsTrigger = styled(Tabs.Trigger, {
	padding: '1.125rem 1.5rem',
	borderRadius: '0.75rem',
	textAlign: 'left',
	baseTransition: 'background',
	'&[data-state="active"]': {
		background: 'hsla(0, 0%, 6%, 1)',
	},
});

const StyledTabsContent = styled(Tabs.Content, {
	position: 'relative',
	aspectRatio: '1210/840',
	'&:focus': {
		outline: 'none',
	},
	'&::before': {
		content: '',
		position: 'absolute',
		top: '25%',
		left: '5%',
		width: '90%',
		height: '50%',
		background:
			'linear-gradient(1.07deg, #EAEAEA 0.92%, #FF27DD 14.72%, #1C94FF 87.83%, #0A0A0A 99.08%)',
		aspectRatio: '1210/840',
		opacity: 0.4,
		filter: 'blur(150px)',
		borderRadius: 9999,
		zIndex: -1,
	},
});

const StyledTabTitle = styled('p', {
	fontSize: '$xl',
	fontWeight: '$semibold',
});

const StyledTabDescription = styled('p', {
	marginTop: '0.75rem',
	fontSize: '$lg',
	color: '$gray11',
});

const StyledFeaturesSection = styled('div', {
	marginBottom: '15rem',
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

const StyledFeaturesGrid = styled('div', {
	marginTop: '6rem',
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

function TabTrigger({
	title,
	description,
	value,
}: {
	title: string;
	description: string;
	value: string;
}) {
	return (
		<StyledTabsTrigger value={value}>
			<StyledTabTitle>{title}</StyledTabTitle>
			<StyledTabDescription>{description}</StyledTabDescription>
		</StyledTabsTrigger>
	);
}

function TabContent({
	value,
	src,
	alt,
}: {
	value: string;
	src: StaticImageData;
	alt: string;
}) {
	return (
		<StyledTabsContent value={value}>
			<Image src={src} alt={alt} quality="95" fill />
		</StyledTabsContent>
	);
}

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
	const howItWorksRef = useRef<HTMLDivElement>(null);
	const howItWorksInView = useInView(howItWorksRef, {
		amount: 0.2,
		once: true,
	});

	return (
		<>
			<StyledTopShadow />

			<StyledHeader>
				<StyledHeaderLogoContainer
					variants={fadeInVariants}
					initial="hidden"
					animate="visible"
					transition={{
						duration: 1.8,
						ease: DEFAULT_EASE,
					}}
				>
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
					<StyledTitle
						variants={fadeInDownVariants}
						initial="hidden"
						animate="visible"
						transition={{
							duration: 1,
							ease: DEFAULT_EASE,
						}}
					>
						Keep your online identity hidden and secure
					</StyledTitle>
					<StyledDescription
						variants={fadeInDownVariants}
						initial="hidden"
						animate="visible"
						transition={{
							duration: 1.2,
							delay: 0.4,
							ease: DEFAULT_EASE,
						}}
					>
						Maskbox protects your real email addresses from internet strangers
						and automatically forwards messages to your inbox.
					</StyledDescription>

					<Link href="/sign-in" passHref legacyBehavior>
						<StyledStartNowButton
							variants={fadeInDownVariants}
							initial="hidden"
							animate="visible"
							transition={{
								duration: 1.4,
								delay: 0.8,
								ease: DEFAULT_EASE,
							}}
						>
							Start now for free
						</StyledStartNowButton>
					</Link>
				</StyledHeaderTextContainer>
			</StyledHeader>

			<StyledHowItWorksSection ref={howItWorksRef}>
				<StyledSectionTitle
					variants={fadeInDownVariants}
					initial="hidden"
					animate={howItWorksInView && 'visible'}
					transition={{
						duration: 1,
						ease: DEFAULT_EASE,
					}}
				>
					How it works
				</StyledSectionTitle>
				<StyledSectionDescription
					variants={fadeInDownVariants}
					initial="hidden"
					animate={howItWorksInView && 'visible'}
					transition={{
						duration: 1.2,
						delay: 0.4,
						ease: DEFAULT_EASE,
					}}
				>
					Share mask addresses instead of your real email address to protect
					your inbox.
				</StyledSectionDescription>

				<Tabs.Root defaultValue="email" orientation="vertical" asChild>
					<StyledTabsRoot
						variants={fadeInVariants}
						initial="hidden"
						animate={howItWorksInView && 'visible'}
						transition={{
							duration: 1.6,
							delay: 1,
							ease: DEFAULT_EASE,
						}}
					>
						<StyledTabsList>
							<TabTrigger
								title="Add your real email address"
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
								Ultricies tristique nulla aliquet enim tortor at auctor urna."
								value="email"
							/>

							<TabTrigger
								title="Generate your unique mask"
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
								Ultricies tristique nulla aliquet enim tortor at auctor urna."
								value="masks"
							/>

							<TabTrigger
								title="Use your mask everywhere"
								description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua.
								Ultricies tristique nulla aliquet enim tortor at auctor urna."
								value="usage"
							/>
						</StyledTabsList>

						<TabContent value="email" src={email} alt="" />
						<TabContent value="masks" src={masks} alt="" />
						<TabContent value="usage" src={usage} alt="" />
					</StyledTabsRoot>
				</Tabs.Root>
			</StyledHowItWorksSection>

			<StyledFeaturesSection>
				<StyledFeaturesGradient />

				<StyledSectionTitle css={{ marginTop: '5rem' }}>
					Privacy-first and features you'll love
				</StyledSectionTitle>
				<StyledSectionDescription>
					Sign up now and start enjoying the benefits.
				</StyledSectionDescription>

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
