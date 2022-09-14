import { globalCss } from '../utils/stitches';

export const useGlobalStyles = globalCss({
	'*, ::after, ::before': {
		boxSizing: 'border-box',
		border: 'none'
	},
	html: {
		colorScheme: 'dark',
		fontFamily: '$sans',
		WebkitFontSmoothing: 'antialiased',
		MozOsxFontSmoothing: 'grayscale',
		WebkitTextSizeAdjust: '100%'
	},
	body: {
		fontSize: '$base',
		background: '$gray1',
		color: '$gray12',
		margin: 0
	},
	'h1, h2, h3, h4, h5, h6': {
		fontSize: 'inherit',
		fontWeight: 'inherit'
	},
	'h1, h2, h3, h4, h5, h6, p, pre': {
		margin: 0
	},
	'button, input, select': {
		fontFamily: 'inherit',
		fontWeight: 'inherit',
		fontSize: '100%',
		lineHeight: 'inherit',
		color: 'inherit',
		outline: 'none',
		margin: 0,
		padding: 0
	},
	'button, select': {
		textTransform: 'none'
	},
	svg: {
		display: 'block',
		verticalAlign: 'middle'
	},
	button: {
		WebkitAppearance: 'button',
		backgroundColor: 'transparent',
		backgroundImage: 'none',
		cursor: 'pointer'
	},
	a: {
		color: 'inherit',
		textDecoration: 'none'
	},
	pre: {
		fontFamily: '$mono'
	},
	table: {
		minWidth: '100%',
		textIndent: 0,
		borderColor: 'inherit',
		borderCollapse: 'separate',
		borderSpacing: 0
	},
	'input::placeholder': {
		opacity: 1
	},
	':disabled': {
		cursor: 'not-allowed'
	}
});
