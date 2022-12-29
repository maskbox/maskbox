import { AnimatePresence, motion, Variants } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Form, useZodForm } from '../ui/Form';
import { Input } from '../ui/Form/Input';
import { SubmitButton } from '../ui/Form/SubmitButton';
import { emailSchema } from '../utils/schema';
import { styled } from '../utils/stitches';

const variants: Variants = {
	initial: {
		opacity: 0,
		scale: 0.96,
		transition: {
			duration: 0.25,
			ease: 'easeInOut',
		},
	},
	animate: {
		opacity: 1,
		scale: 1,
	},
};

const StyledContent = styled(motion.div, {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

const StyledHeading = styled('h1', {
	fontSize: '$xl',
	fontWeight: '$semibold',
	marginBottom: '1.25rem',
});

const StyledParagraph = styled('p', {
	color: '$gray11',
	textAlign: 'center',
});

const StyledStrong = styled('strong', {
	fontWeight: '$semibold',
	color: '$gray12',
});

export default function SignIn() {
	const [email, setEmail] = useState<string | undefined>(undefined);

	const form = useZodForm({
		schema: emailSchema,
		defaultValues: {
			email: '',
		},
	});

	return (
		<>
			<NextSeo title="Sign in" noindex nofollow />

			<AnimatePresence mode="wait" initial={false}>
				<StyledContent
					key={email ? 'signInSuccess' : 'signInForm'}
					variants={variants}
					initial="initial"
					animate="animate"
					exit="initial"
				>
					{email ? (
						<>
							<StyledHeading>Check your email</StyledHeading>

							<StyledParagraph>
								We've sent you a temporary sign-in link.
							</StyledParagraph>
							<StyledParagraph>
								Please check your inbox at <StyledStrong>{email}</StyledStrong>.
							</StyledParagraph>

							<Button
								variant="ghost"
								css={{ marginTop: '1.75rem' }}
								onClick={() => {
									form.reset();
									setEmail(undefined);
								}}
							>
								Back to sign in
							</Button>
						</>
					) : (
						<>
							<StyledHeading>Sign in to Maskbox</StyledHeading>

							<Form
								form={form}
								onSubmit={async (data) => {
									const result = await signIn('email', {
										email: data.email,
										redirect: false,
										callbackUrl: '/masks',
									});

									if (result?.ok) {
										setEmail(data.email);
									}
								}}
								noValidate
							>
								<Input
									type="email"
									name="email"
									label="Email"
									placeholder="Enter your email address..."
									autoComplete="email"
									css={{ width: '18rem' }}
								/>

								<SubmitButton css={{ width: '100%', marginTop: '1rem' }}>
									Sign in
								</SubmitButton>
							</Form>
						</>
					)}
				</StyledContent>
			</AnimatePresence>
		</>
	);
}

SignIn.layout = 'auth';
