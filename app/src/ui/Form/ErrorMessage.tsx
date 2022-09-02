import { ErrorMessage as HookFormErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';
import { styled } from '../../utils/stitches';

const StyledErrorMessage = styled('p', {
	fontSize: '$sm',
	marginTop: '0.25rem',
	color: '$red11'
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
