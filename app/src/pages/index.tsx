import {
	CodeIcon,
	LapTimerIcon,
	PlusCircledIcon,
	StackIcon,
} from '@radix-ui/react-icons';
import { ComponentProps } from '@stitches/react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { NextSeo } from 'next-seo';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { ReactNode, useRef, useState } from 'react';
import email from '../../public/email.png';
import masks from '../../public/masks.png';
import usage from '../../public/usage.png';
import { styled } from '../utils/stitches';

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
	padding: '4rem 1rem 7rem',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '4rem',
	zIndex: 40,
	'@md': {
		padding: '7rem 0',
		gap: '8rem',
	},
});

const StyledHeaderLogoContainer = styled(motion.div, {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: -1,
});

const StyledHeaderLogo = styled('svg', {
	zIndex: 40,
	filter: 'drop-shadow(0px 4px 15px hsla(0, 0%, 0%, 0.3))',
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
	fontSize: '3rem',
	fontWeight: '$semibold',
	lineHeight: '3.5rem',
	textAlign: 'center',
	background:
		'linear-gradient(180deg, $colors$gray12 1.5%, $colors$gray11 105%)',
	color: 'transparent',
	backgroundClip: 'text',
	textFillColor: 'transparent',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
	'@md': {
		fontSize: '3.75rem',
		lineHeight: '4.5rem',
	},
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
	padding: '0 1rem',
	fontSize: '2.25rem',
	fontWeight: '$semibold',
	lineHeight: '3rem',
	textAlign: 'center',
	'@sm': {
		padding: 0,
	},
});

const StyledSectionDescription = styled(motion.p, {
	maxWidth: '24rem',
	marginTop: '1.125rem',
	padding: '0 1rem',
	fontSize: '1.125rem',
	lineHeight: '1.5rem',
	textAlign: 'center',
	color: '$gray11',
	'@sm': {
		padding: 0,
	},
});

const StyledHowItWorksSection = styled('div', {
	marginBottom: '8rem',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	'@md': {
		marginBottom: '15rem',
	},
});

const StyledTabsRoot = styled(motion.div, {
	maxWidth: '83rem',
	marginTop: '6rem',
	padding: '0 1rem',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '3rem',
	zIndex: 40,
	'@lg': {
		display: 'grid',
		gridTemplateColumns: '1fr 1.5fr',
		gap: '5rem',
	},
});

const StyledTabsList = styled('div', {
	display: 'flex',
	padding: '0 1rem',
	flexDirection: 'column',
	alignItems: 'start',
	gap: '1rem',
	'@sm': {
		gap: '1.75rem',
	},
	'@lg': {
		padding: 0,
		gap: '2.5rem',
	},
});

const StyledTabsTrigger = styled('button', {
	padding: '1.125rem 1.5rem',
	borderRadius: '0.75rem',
	textAlign: 'left',
	baseTransition: 'background',
	'&[data-state="active"]': {
		background: 'hsla(0, 0%, 6%, 1)',
	},
});

const StyledTabsContentWrapper = styled('div', {
	position: 'relative',
	width: '100vw',
	height: '100%',
	'@lg': {
		width: 'auto',
		height: 'auto',
	},
});

const StyledTabsContent = styled(motion.div, {
	position: 'relative',
	margin: '0 1.25rem',
	aspectRatio: '1210/840',
	'@lg': {
		margin: 0,
	},
});

const StyledTabsGradient = styled('div', {
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
});

const StyledTabTitle = styled('p', {
	fontSize: '$xl',
	fontWeight: '$semibold',
});

const StyledTabDescription = styled('p', {
	marginTop: '0.75rem',
	display: 'none',
	fontSize: '$lg',
	color: '$gray11',
	'&[data-state="active"]': {
		display: 'block',
	},
	'@lg': {
		display: 'block',
	},
});

const StyledFeaturesSection = styled('div', {
	marginBottom: '5rem',
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	overflow: 'hidden',
	zIndex: 40,
	'@md': {
		marginBottom: '9rem',
	},
});

const StyledFeaturesBorder = styled(motion.div, {
	position: 'absolute',
	top: 0,
	left: 'calc(50% - 1100px/2)',
	width: 1100,
	height: 1,
	background:
		'linear-gradient(90deg, rgba(234, 234, 234, 0) 0.01%, rgba(234, 234, 234, 0.3) 48.44%, rgba(234, 234, 234, 0) 99.99%)',
});

const StyledFeaturesGradient = styled(motion.div, {
	position: 'absolute',
	top: -35,
	width: 800,
	height: 280,
	borderRadius: 9999,
	background:
		'linear-gradient(88.93deg, #EAEAEA 0.76%, #FF27DD 14.6%, #1C94FF 87.89%, #0A0A0A 99.17%)',
	filter: 'blur(150px)',
	zIndex: -1,
});

const StyledFeaturesGrid = styled('div', {
	margin: '6rem 1rem',
	display: 'grid',
	gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
	gap: '0.625rem',
	'@md': {
		margin: '6rem',
		gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
	},
	'@lg': {
		gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
	},
	'@xl': {
		gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
	},
});

const StyledFeatureCard = styled(motion.div, {
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

const howItWorksSections: {
	id: string;
	title: string;
	description: string;
	alt: string;
	image: StaticImageData;
}[] = [
	{
		id: 'email',
		title: 'Add your real email address',
		description:
			'By adding your real email address, you can ensure that you receive all of your messages to it while still keeping your real email address private.',
		alt: 'Image of how to add your real email address',
		image: email,
	},
	{
		id: 'masks',
		title: 'Generate your unique mask',
		description:
			'Select from a set of algorithms to generate your unique mask. This mask acts as a buffer between your real email address and the outside world.',
		alt: 'Image of the list of generated masks',
		image: masks,
	},
	{
		id: 'usage',
		title: 'Use your mask everywhere',
		description:
			'Once your unique mask is generated, you can use it to protect your emails wherever you go. Messages sent to your mask address are instantly forwarded to your inbox.',
		alt: 'Image of the mask used in an application',
		image: usage,
	},
];

const features: FeatureCardProps[] = [
	{
		title: '100% open-source',
		description:
			'Our code is available for anyone to review and improve. This ensures transparency, security, and constant improvement.',
		icon: <CodeIcon width="30" height="30" />,
	},
	{
		title: 'Free forever',
		description:
			'No hidden fees or costs. Sign in now and start protecting your privacy without spending a penny.',
		icon: <LapTimerIcon width="30" height="30" />,
	},
	{
		title: 'One email, multiple masks',
		description:
			'Protect your privacy and keep your personal information safe, no matter how many masks you need.',
		icon: <StackIcon width="30" height="30" />,
	},
	{
		title: 'Use everywhere (soon)',
		description: `Easily install our extension on your preferred browser and protect your emails while you're browsing the web.`,
		icon: <PlusCircledIcon width="30" height="30" />,
	},
];

function TabTrigger({
	title,
	description,
	selected,
	...props
}: ComponentProps<typeof StyledTabsTrigger> & {
	title: string;
	description: string;
	selected: boolean;
}) {
	return (
		<StyledTabsTrigger {...props} data-state={selected && 'active'}>
			<StyledTabTitle>{title}</StyledTabTitle>
			<StyledTabDescription data-state={selected && 'active'}>
				{description}
			</StyledTabDescription>
		</StyledTabsTrigger>
	);
}

function TabContent({ src, alt }: { src: StaticImageData; alt: string }) {
	return (
		<StyledTabsContent
			initial={{ opacity: 0, y: '10px' }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: '-10px' }}
			transition={{
				duration: 0.1,
				stiffness: 300,
				damping: 30,
			}}
		>
			<Image src={src} alt={alt} quality="95" fill />
		</StyledTabsContent>
	);
}

function FeatureCard({
	title,
	description,
	icon,
	...props
}: ComponentProps<typeof StyledFeatureCard> & FeatureCardProps) {
	return (
		<StyledFeatureCard {...props}>
			<StyledFeatureIcon>{icon}</StyledFeatureIcon>
			<StyledFeatureTitle>{title}</StyledFeatureTitle>
			<StyledFeatureDescription>{description}</StyledFeatureDescription>
		</StyledFeatureCard>
	);
}

export default function Home() {
	const [selectedFeature, setSelectedFeature] = useState('email');

	const howItWorksRef = useRef<HTMLDivElement>(null);
	const featuresRef = useRef<HTMLDivElement>(null);

	const howItWorksInView = useInView(howItWorksRef, {
		amount: 0.5,
		once: true,
	});
	const featuresInView = useInView(featuresRef, {
		amount: 0.3,
		once: true,
	});

	return (
		<>
			<NextSeo title="Keep your online identity hidden and secure" />

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

					<StyledHeaderLogo
						xmlns="http://www.w3.org/2000/svg"
						width="128"
						height="128"
						fill="none"
						viewBox="0 0 524 524"
					>
						<path
							fill="url(#a)"
							fillRule="evenodd"
							d="M262.5 25a117.942 117.942 0 0 0-83.471 34.635 118.352 118.352 0 0 0-34.574 83.615v67.571a67.396 67.396 0 0 0-47.698 19.792A67.63 67.63 0 0 0 77 278.393v152.036a67.63 67.63 0 0 0 19.757 47.78A67.395 67.395 0 0 0 144.455 498h236.09a67.395 67.395 0 0 0 47.698-19.791A67.631 67.631 0 0 0 448 430.429V278.393a67.631 67.631 0 0 0-19.757-47.78 67.396 67.396 0 0 0-47.698-19.792V143.25C380.545 77.931 327.706 25 262.5 25Zm84.318 185.821V143.25a84.538 84.538 0 0 0-24.696-59.725 84.244 84.244 0 0 0-59.622-24.74 84.244 84.244 0 0 0-59.622 24.74 84.538 84.538 0 0 0-24.696 59.725v67.571h168.636Zm-83.837 177.798-.048.078-173.16-119.585 173.417 96.405 173.105-96.232-173.16 119.585-.154-.251Z"
							clipRule="evenodd"
						/>
						<defs>
							<linearGradient
								id="a"
								x1="262.5"
								x2="262.5"
								y1="25"
								y2="498"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#EDEDED" stopOpacity=".95" />
								<stop offset="1" stopColor="#EDEDED" stopOpacity=".55" />
							</linearGradient>
						</defs>
					</StyledHeaderLogo>
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
					initial={false}
					animate={howItWorksInView ? 'visible' : 'hidden'}
					transition={{
						duration: 1,
						ease: DEFAULT_EASE,
					}}
				>
					How it works
				</StyledSectionTitle>
				<StyledSectionDescription
					variants={fadeInDownVariants}
					initial={false}
					animate={howItWorksInView ? 'visible' : 'hidden'}
					transition={{
						duration: 1.2,
						delay: 0.4,
						ease: DEFAULT_EASE,
					}}
				>
					Share mask addresses instead of your real email address to protect
					your inbox.
				</StyledSectionDescription>

				<StyledTabsRoot
					variants={fadeInVariants}
					initial={false}
					animate={howItWorksInView ? 'visible' : 'hidden'}
					transition={{
						duration: 2,
						delay: 0.8,
						ease: DEFAULT_EASE,
					}}
				>
					<StyledTabsList>
						{howItWorksSections.map(({ id, title, description }) => (
							<TabTrigger
								key={id}
								title={title}
								description={description}
								selected={selectedFeature === id}
								onClick={() => setSelectedFeature(id)}
							/>
						))}
					</StyledTabsList>

					<StyledTabsContentWrapper>
						<StyledTabsGradient />

						<AnimatePresence mode="wait">
							{howItWorksSections.map(({ id, alt, image }) => {
								if (selectedFeature === id) {
									return <TabContent src={image} alt={alt} key={id} />;
								}
							})}
						</AnimatePresence>
					</StyledTabsContentWrapper>
				</StyledTabsRoot>
			</StyledHowItWorksSection>

			<StyledFeaturesSection ref={featuresRef}>
				<StyledFeaturesBorder
					initial={false}
					animate={featuresInView ? { opacity: 0.6 } : { opacity: 0 }}
					transition={{
						duration: 1,
						ease: DEFAULT_EASE,
					}}
				/>

				<StyledFeaturesGradient
					initial={false}
					animate={featuresInView ? { opacity: 0.3 } : { opacity: 0 }}
					transition={{
						duration: 1,
						delay: 0.2,
						ease: DEFAULT_EASE,
					}}
				/>

				<StyledSectionTitle
					variants={fadeInDownVariants}
					initial={false}
					animate={featuresInView ? 'visible' : 'hidden'}
					transition={{
						duration: 1.2,
						delay: 0.4,
						ease: DEFAULT_EASE,
					}}
					css={{ marginTop: '5rem' }}
				>
					Privacy-first and features you'll love
				</StyledSectionTitle>
				<StyledSectionDescription
					variants={fadeInDownVariants}
					initial={false}
					animate={featuresInView ? 'visible' : 'hidden'}
					transition={{
						duration: 1.4,
						delay: 0.8,
						ease: DEFAULT_EASE,
					}}
				>
					Experience the best of both worlds with Maskbox and our features.
				</StyledSectionDescription>

				<StyledFeaturesGrid>
					{features.map((props, i) => (
						<FeatureCard
							{...props}
							initial={{ opacity: 0, y: '16px' }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{
								duration: 1.4,
								delay: 1,
								ease: DEFAULT_EASE,
							}}
							viewport={{ once: true, amount: 0.01 }}
							key={i}
						/>
					))}
				</StyledFeaturesGrid>
			</StyledFeaturesSection>
		</>
	);
}

Home.layout = 'landing';
