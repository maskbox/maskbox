import { blackA, grayDark, redDark } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';
import type { PropertyValue, ScaleValue } from '@stitches/react';

export const {
	styled,
	css,
	globalCss,
	keyframes,
	getCssText,
	theme,
	createTheme,
	config
} = createStitches({
	theme: {
		fonts: {
			sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
			mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
		},
		colors: {
			...blackA,
			...grayDark,
			...redDark
		},
		fontSizes: {
			sm: '0.75rem',
			base: '0.875rem',
			lg: '1rem',
			xl: '1.25rem'
		},
		lineHeights: {
			sm: '1rem',
			base: '1.25rem',
			lg: '1.5rem',
			xl: '1.75rem'
		},
		fontWeights: {
			normal: 400,
			medium: 500,
			semibold: 600,
			bold: 700
		}
	},
	utils: {
		fontSize: (value: ScaleValue<'fontSize'>) => ({
			fontSize: value,
			lineHeight: value
		}),
		baseTransition: (value: PropertyValue<'transitionProperty'>) => ({
			transitionProperty: value,
			transitionTimingFunction: 'ease-in-out',
			transitionDuration: '150ms'
		})
	}
});
