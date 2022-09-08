import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ComponentProps } from 'react';
import { keyframes, styled } from '../utils/stitches';

const menuOpen = keyframes({
	'0%': { opacity: 0, scale: 0.98 },
	'100%': { opacity: 1, scale: 1 }
});

const menuClose = keyframes({
	'0%': { opacity: 1, scale: 1 },
	'100%': { opacity: 0, scale: 0.98 }
});

const StyledContent = styled(DropdownMenuPrimitive.Content, {
	padding: '0.25rem 0',
	minWidth: '12rem',
	background: '$gray2',
	border: '1px solid $gray6',
	borderRadius: '0.375rem',
	boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 8px 0px',
	userSelect: 'none',
	'&[data-state="open"]': {
		animation: `${menuOpen} 150ms ease-in-out`
	},
	'&[data-state="closed"]': {
		animation: `${menuClose} 150ms ease-in-out`
	}
});

export const DropdownMenu = DropdownMenuPrimitive.DropdownMenu;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

export const DropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator, {
	margin: '0.25rem 0',
	height: 1,
	background: '$gray6'
});

export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item, {
	padding: '0.375rem 0.75rem',
	baseTransition: 'color, background',
	outline: 'none',
	'&[data-highlighted]': {
		cursor: 'pointer',
		background: '$gray4'
	}
});

export function DropdownMenuContent({
	align = 'end',
	sideOffset = 6,
	...props
}: ComponentProps<typeof StyledContent>) {
	return (
		<DropdownMenuPrimitive.Portal>
			<StyledContent align={align} sideOffset={sideOffset} {...props} />
		</DropdownMenuPrimitive.Portal>
	);
}
