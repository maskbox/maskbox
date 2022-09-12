import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ComponentProps } from 'react';
import { keyframes, styled } from '../utils/stitches';

const tooltipOpen = keyframes({
	'0%': { opacity: 0, scale: 0.95 },
	'100%': { opacity: 1, scale: 1 }
});

const tooltipClose = keyframes({
	'0%': { opacity: 1, scale: 1 },
	'100%': { opacity: 0, scale: 0.95 }
});

const StyledContent = styled(TooltipPrimitive.Content, {
	padding: '0.25rem 0.375rem',
	fontSize: '$sm',
	background: '$gray2',
	color: '$gray11',
	boxShadow: '$border1',
	borderRadius: '0.375rem',
	'&[data-state="delayed-open"]': {
		animation: `${tooltipOpen} 150ms ease-in-out`
	},
	'&[data-state="closed"]': {
		animation: `${tooltipClose} 150ms ease-in-out`
	}
});

export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({
	side = 'bottom',
	sideOffset = 8,
	...props
}: ComponentProps<typeof StyledContent>) {
	return (
		<TooltipPrimitive.Portal>
			<StyledContent side={side} sideOffset={sideOffset} {...props} />
		</TooltipPrimitive.Portal>
	);
}

export function Tooltip({ ...props }: TooltipPrimitive.TooltipProps) {
	return (
		<TooltipPrimitive.Provider>
			<TooltipPrimitive.Root {...props} />
		</TooltipPrimitive.Provider>
	);
}
