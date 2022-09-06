import { ErrorMessage as HookFormErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';
import { keyframes, styled } from '../../utils/stitches';

const fadeIn = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 }
});

const StyledErrorMessage = styled('p', {
	fontSize: '$sm',
	marginTop: '0.25rem',
	paddingLeft: '0.125rem',
	color: '$red11',
	animation: `${fadeIn} 200ms`
});

export function ErrorMessage({
	name,
	errors
}: {
	name: string;
	errors: FieldErrors;
}) {
	return (
		<HookFormErrorMessage
			name={name}
			errors={errors}
			render={({ message }) => (
				<StyledErrorMessage>{message}</StyledErrorMessage>
			)}
		/>
	);
}
