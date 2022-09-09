import { ComponentProps } from 'react';
import { useFormState } from 'react-hook-form';
import { keyframes, styled } from '../../utils/stitches';
import { Button } from '../Button';

const pulse = keyframes({
	'0%, 100%': { opacity: 1 },
	'50%': { opacity: 0.6 }
});

const LoadingDot = styled('span', {
	width: '0.375rem',
	height: '0.375rem',
	background: '$gray1',
	borderRadius: '50%',
	animation: `${pulse} 1.4s linear infinite`,
	'&:not(:last-of-type)': {
		marginRight: '0.125rem'
	}
});

const LoadingDots = styled('div', {
	position: 'absolute',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	height: '100%',
	inset: 0,
	background: 'inherit'
});

export function SubmitButton({
	children,
	allowDisable = true,
	...props
}: ComponentProps<typeof Button> & { allowDisable?: boolean }) {
	const { isDirty, isSubmitting } = useFormState();

	return (
		<Button
			{...props}
			type="submit"
			disabled={(allowDisable && !isDirty) || isSubmitting}
		>
			{isSubmitting && (
				<LoadingDots>
					<LoadingDot />
					<LoadingDot css={{ animationDelay: '0.3s' }} />
					<LoadingDot css={{ animationDelay: '0.6s' }} />
				</LoadingDots>
			)}

			{children}
		</Button>
	);
}
