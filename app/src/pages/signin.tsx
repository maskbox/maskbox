import { z } from 'zod';
import { Form, useZodForm } from '../ui/Form';
import { Input } from '../ui/Form/Input';
import { SubmitButton } from '../ui/Form/SubmitButton';
import { styled } from '../utils/stitches';

const StyledContent = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '21rem'
});

const StyledHeading = styled('h1', {
	fontSize: '$lg',
	fontWeight: '$semibold',
	marginBottom: '1.5rem'
});

export default function SignIn() {
	const form = useZodForm({
		schema: z.object({
			email: z
				.string()
				.email({ message: 'Please enter a valid email address.' })
		}),
		defaultValues: {
			email: ''
		}
	});

	return (
		<StyledContent>
			<StyledHeading>Sign in to Maskbox</StyledHeading>

			<Form form={form} onSubmit={(data) => console.log(data)} noValidate>
				<Input
					type="email"
					name="email"
					label="Email"
					placeholder="Enter your email address..."
					autoComplete="email"
				/>

				<SubmitButton>Sign in</SubmitButton>
			</Form>
		</StyledContent>
	);
}
