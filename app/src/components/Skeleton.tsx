import { keyframes, styled } from '../utils/stitches';

const loading = keyframes({
	from: { backgroundPosition: '200% 0' },
	to: { backgroundPosition: '-200% 0' },
});

export const Skeleton = styled('div', {
	width: '100%',
	height: '1.25rem',
	backgroundImage:
		'linear-gradient(270deg, $colors$gray5, $colors$gray3, $colors$gray3, $colors$gray5)',
	backgroundSize: '400% 100%',
	borderRadius: '0.375rem',
	animation: `${loading} 8s ease-in-out infinite`,
});
