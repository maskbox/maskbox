import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Form, useZodForm } from '../ui/Form';
import { Input } from '../ui/Form/Input';
import { SubmitButton } from '../ui/Form/SubmitButton';
import { authChallengeSchema } from '../utils/schema';
import { styled } from '../utils/stitches';
import { trpc } from '../utils/trpc';

const variants = {
	initial: {
		opacity: 0,
		scale: 0.96
	},
	animate: {
		opacity: 1,
		scale: 1
	}
};

const StyledContent = styled(motion.div, {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '21rem'
});

const StyledHeading = styled('h1', {
	fontSize: '$lg',
	fontWeight: '$semibold',
	marginBottom: '1.25rem'
});

const StyledParagraph = styled('p', {
	color: '$gray11',
	wordBreak: 'break-all'
});

const StyledStrong = styled('strong', {
	fontWeight: '$semibold',
	color: '$gray12'
});

export default function SignIn() {
	const form = useZodForm({
		schema: authChallengeSchema,
		defaultValues: {
			email: ''
		}
	});

	const { mutateAsync, data, reset } = trpc.useMutation(['auth.challenge'], {
		onSuccess: () => form.reset()
	});

	return (
		<AnimatePresence mode="wait" initial={false}>
			<StyledContent
				key={data ? 'signInSuccess' : 'signInForm'}
				variants={variants}
				initial="initial"
				animate="animate"
				exit="initial"
				transition={{ duration: 0.25, ease: 'easeInOut' }}
			>
				{data ? (
					<>
						<StyledHeading>Check your email</StyledHeading>

						<StyledParagraph>
							We've sent you a temporary sign-in link.
						</StyledParagraph>
						<StyledParagraph>
							Please check your inbox at{' '}
							<StyledStrong>{data.email}</StyledStrong>.
						</StyledParagraph>

						<Button
							variant="ghost"
							css={{ marginTop: '1.75rem' }}
							onClick={() => reset()}
						>
							Back to sign in
						</Button>
					</>
				) : (
					<>
						<StyledHeading>Sign in to Maskbox</StyledHeading>

						<Form form={form} onSubmit={(data) => mutateAsync(data)} noValidate>
							<Input
								type="email"
								name="email"
								label="Email"
								placeholder="Enter your email address..."
								autoComplete="email"
							/>

							<SubmitButton css={{ width: '100%', marginTop: '1rem' }}>
								Sign in
							</SubmitButton>
						</Form>
					</>
				)}
			</StyledContent>
		</AnimatePresence>
	);
}
