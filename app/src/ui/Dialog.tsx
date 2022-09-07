import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ComponentProps, ReactNode, useState } from 'react';
import { keyframes, styled } from '../utils/stitches';
import { Button, ButtonProps } from './Button';

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

const StyledOverlay = styled(DialogPrimitive.Overlay, {
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
});

const StyledContent = styled(DialogPrimitive.Content, {
	position: 'fixed',
	top: '50%',
	left: '50%',
	padding: '1rem',
	width: '30rem',
	background: '$gray1',
	transform: 'translate(-50%, -50%)',
	border: '1px solid $gray6',
	borderRadius: '0.375rem',
	'@media (prefers-reduced-motion: no-preference)': {
		'&[data-state="open"]': {
			animation: `${contentOpen} 150ms ease-in-out`
		},
		'&[data-state="closed"]': {
			animation: `${contentClose} 150ms ease-in-out`
		}
	}
});

const StyledHeader = styled('div', {
	marginBottom: '1.5rem'
});

const StyledHeaderRow = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between'
});

const StyledCrossButton = styled(DialogPrimitive.Close, {
	marginRight: '-0.125rem',
	padding: '0.125rem',
	color: '$gray11',
	borderRadius: '0.25rem',
	baseTransition: 'background, color',
	'&:hover': {
		background: '$gray3',
		color: '$gray12'
	}
});

const StyledTitle = styled(DialogPrimitive.Title, {
	fontSize: '$xl',
	fontWeight: '$semibold'
});

const StyledDescription = styled(DialogPrimitive.Description, {
	marginTop: '0.25rem',
	fontSize: '$sm',
	color: '$gray11'
});

export const DialogButtonGroup = styled('div', {
	display: 'flex',
	justifyContent: 'end',
	marginTop: '1rem',
	'&>button:not(:last-of-type)': {
		marginRight: '0.5rem'
	}
});

export const DialogTrigger = DialogPrimitive.Trigger;

export function useDialog() {
	const [open, setOpen] = useState(false);

	return { open, setOpen };
}

export function DialogHeader({
	title,
	description
}: {
	title: string;
	description?: string;
}) {
	return (
		<StyledHeader>
			<StyledHeaderRow>
				<StyledTitle>{title}</StyledTitle>
				<StyledCrossButton>
					<Cross2Icon width="16" height="16" />
				</StyledCrossButton>
			</StyledHeaderRow>

			{description && <StyledDescription>{description}</StyledDescription>}
		</StyledHeader>
	);
}

export function DialogCloseButton(props: Omit<ButtonProps, 'variant'>) {
	return (
		<DialogPrimitive.Close asChild>
			<Button {...props} variant="outline" />
		</DialogPrimitive.Close>
	);
}

export function DialogContent(props: ComponentProps<typeof StyledContent>) {
	return (
		<DialogPrimitive.Portal>
			<StyledOverlay />
			<StyledContent {...props} />
		</DialogPrimitive.Portal>
	);
}

export function Dialog({
	dialog: { open, setOpen },
	children
}: {
	dialog: ReturnType<typeof useDialog>;
	children: ReactNode;
}) {
	return (
		<DialogPrimitive.Dialog open={open} onOpenChange={(val) => setOpen(val)}>
			{children}
		</DialogPrimitive.Dialog>
	);
}
