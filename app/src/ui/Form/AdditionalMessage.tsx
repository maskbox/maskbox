import { FieldError, get, useFormContext } from 'react-hook-form';
import { keyframes, styled } from '../../utils/stitches';

const fadeIn = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

const StyledMessage = styled('p', {
	fontSize: '$sm',
	marginTop: '0.375rem',
	paddingLeft: '0.125rem',
	variants: {
		variant: {
			info: {
				color: '$gray11',
			},
			danger: {
				color: '$red11',
				animation: `${fadeIn} 200ms`,
			},
		},
	},
});

export function AdditionalMessage({
	name,
	message,
}: {
	name: string;
	message?: string;
}) {
	const {
		formState: { errors },
	} = useFormContext();
	const fieldError = get(errors, name) as FieldError | undefined;

	if (!fieldError && !message) {
		return null;
	}

	if (!fieldError && message) {
		return <StyledMessage variant="info">{message}</StyledMessage>;
	}

	return <StyledMessage variant="danger">{fieldError?.message}</StyledMessage>;
}
