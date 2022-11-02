import {
	blackA,
	grayDark,
	grayDarkA,
	greenDark,
	redDark
} from '@radix-ui/colors';
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
			...grayDarkA,
			...greenDark,
			...redDark,
			landing: 'hsla(0, 0%, 2%, 1)'
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
		},
		shadows: {
			border1: '$colors$gray6 0px 0px 0px 1px',
			border2: '$colors$gray8 0px 0px 0px 1px',
			base: '$colors$blackA9 0px 2px 8px 0px'
		}
	},
	media: {
		sm: '(min-width: 640px)',
		md: '(min-width: 768px)',
		lg: '(min-width: 1024px)',
		xl: '(min-width: 1280px)'
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
