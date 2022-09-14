import type { CSS } from '@stitches/react';

export const overlayOpenAnimationProps = {
	opacity: 1
};

export const overlayCloseAnimationProps = {
	opacity: 0
};

export const contentOpenAnimationProps = {
	opacity: 0,
	transform: 'translate(-50%, -50%) scale(0.85)'
};

export const contentCloseAnimationProps = {
	opacity: 1,
	transform: 'translate(-50%, -50%) scale(1)'
};

export const overlayStyles: CSS = {
	position: 'fixed',
	inset: 0,
	background: '$blackA11',
	backdropFilter: 'blur(2px)'
};

export const contentStyles: CSS = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	padding: '1rem 1.25rem',
	width: '90vw',
	maxWidth: '28rem',
	background: '$gray1',
	transform: 'translate(-50%, -50%)',
	boxShadow: '$border1',
	borderRadius: '0.375rem',
	'&:focus': {
		outline: 'none'
	},
	'@sm': {
		width: '28rem'
	}
};
