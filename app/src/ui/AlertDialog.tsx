import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { ReactNode } from 'react';
import { keyframes, styled } from '../utils/stitches';
import { Button } from './Button';
import {
	contentCloseAnimationProps,
	contentOpenAnimationProps,
	contentStyles,
	overlayCloseAnimationProps,
	overlayOpenAnimationProps,
	overlayStyles
} from './styles';

export const AlertDialog = AlertDialogPrimitive.AlertDialog;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const overlayOpen = keyframes({
	'0%': overlayCloseAnimationProps,
	'100%': overlayOpenAnimationProps
});

const overlayClose = keyframes({
	'0%': overlayOpenAnimationProps,
	'100%': overlayCloseAnimationProps
});

const contentOpen = keyframes({
	'0%': contentOpenAnimationProps,
	'100%': contentCloseAnimationProps
});

const contentClose = keyframes({
	'0%': contentCloseAnimationProps,
	'100%': contentOpenAnimationProps
});

const StyledOverlay = styled(AlertDialogPrimitive.Overlay, {
	...overlayStyles,
	'@media (prefers-reduced-motion: no-preference)': {
		'&[data-state="open"]': {
			animation: `${overlayOpen} 150ms ease-in-out`
		},
		'&[data-state="closed"]': {
			animation: `${overlayClose} 150ms ease-in-out`
		}
	}
});

const StyledContent = styled(AlertDialogPrimitive.Content, {
	...contentStyles,
	'@media (prefers-reduced-motion: no-preference)': {
		'&[data-state="open"]': {
			animation: `${contentOpen} 150ms ease-in-out`
		},
		'&[data-state="closed"]': {
			animation: `${contentClose} 150ms ease-in-out`
		}
	}
});

const StyledTitle = styled(AlertDialogPrimitive.Title, {
	fontSize: '$xl',
	fontWeight: '$semibold'
});

const StyledDescription = styled(AlertDialogPrimitive.Description, {
	marginTop: '0.5rem',
	color: '$gray11',
	wordBreak: 'break-word'
});

const StyledButtonGroup = styled('div', {
	display: 'flex',
	justifyContent: 'end',
	marginTop: '1rem',
	'&>button:not(:last-of-type)': {
		marginRight: '0.5rem'
	}
});

export function AlertDialogContent({
	title,
	description,
	actionLabel,
	onAction
}: {
	title: string;
	description: ReactNode;
	actionLabel: string;
	onAction: () => void | Promise<void>;
}) {
	return (
		<AlertDialogPrimitive.Portal>
			<StyledOverlay />
			<StyledContent onCloseAutoFocus={(e) => e.preventDefault()}>
				<StyledTitle>{title}</StyledTitle>
				<StyledDescription>{description}</StyledDescription>
				<StyledButtonGroup>
					<AlertDialogPrimitive.Cancel asChild>
						<Button variant="outline">Cancel</Button>
					</AlertDialogPrimitive.Cancel>

					<AlertDialogPrimitive.Action onClick={onAction} asChild>
						<Button>{actionLabel}</Button>
					</AlertDialogPrimitive.Action>
				</StyledButtonGroup>
			</StyledContent>
		</AlertDialogPrimitive.Portal>
	);
}
