import { styled } from '../utils/stitches';

export const Button = styled('button', {
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontWeight: '$semibold',
	padding: '0.375rem 0.75rem',
	borderRadius: '0.375rem',
	baseTransition: 'background, color, opacity',
	overflow: 'hidden',
	'&:disabled': {
		opacity: 0.85
	},
	variants: {
		variant: {
			primary: {
				background: '$gray12',
				color: '$gray5',
				'&:hover:enabled': {
					color: '$gray1'
				}
			},
			ghost: {
				background: 'transparent',
				color: '$gray11',
				'&:hover:enabled': {
					background: '$gray3',
					color: '$gray12'
				}
			}
		}
	},
	defaultVariants: {
		variant: 'primary'
	}
});
