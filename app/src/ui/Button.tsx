import { styled } from '../utils/stitches';

export const Button = styled('button', {
	width: '100%',
	fontWeight: '$semibold',
	marginTop: '1rem',
	padding: '0.375rem 0.75rem',
	borderRadius: '0.375rem',
	background: '$gray12',
	color: '$gray5',
	baseTransition: 'color',
	'&:hover': {
		color: '$gray1'
	}
});
