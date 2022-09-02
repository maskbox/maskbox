import { Button } from '../ui/Button';
import { Form } from '../ui/Form';
import { Input } from '../ui/Form/Input';
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
	return (
		<StyledContent>
			<StyledHeading>Sign in to Maskbox</StyledHeading>

			<Form>
				<Input
					type="email"
					name="email"
					label="Email"
					placeholder="Enter your email address..."
				/>

				<Button>Sign in</Button>
			</Form>
		</StyledContent>
	);
}
