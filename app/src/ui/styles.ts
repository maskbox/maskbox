import type { CSS } from '@stitches/react';
import { keyframes } from '../utils/stitches';

const overlayOpen = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 }
});

const overlayClose = keyframes({
	'0%': { opacity: 1 },
	'100%': { opacity: 0 }
});

const contentOpen = keyframes({
	'0%': { opacity: 0, transform: 'translate(-50%, -50%) scale(0.85)' },
	'100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
});

const contentClose = keyframes({
	'0%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
	'100%': { opacity: 0, transform: 'translate(-50%, -50%) scale(0.85)' }
});

export const overlayStyles: CSS = {
	position: 'fixed',
	inset: 0,
	background: '$blackA11',
	backdropFilter: 'blur(2px)',
	'@media (prefers-reduced-motion: no-preference)': {
		'&[data-state="open"]': {
			animation: `${overlayOpen} 150ms ease-in-out`
		},
		'&[data-state="closed"]': {
			animation: `${overlayClose} 150ms ease-in-out`
		}
	}
};

export const contentStyles: CSS = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	padding: '1rem',
	width: '30rem',
	background: '$gray1',
	transform: 'translate(-50%, -50%)',
	border: '1px solid $gray6',
	borderRadius: '0.375rem',
	'&:focus': {
		outline: 'none'
	},
	'@media (prefers-reduced-motion: no-preference)': {
		'&[data-state="open"]': {
			animation: `${contentOpen} 150ms ease-in-out`
		},
		'&[data-state="closed"]': {
			animation: `${contentClose} 150ms ease-in-out`
		}
	}
};
