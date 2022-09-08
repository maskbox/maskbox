import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { ReactNode } from 'react';
import { styled } from '../utils/stitches';
import { Button } from './Button';
import { contentStyles, overlayStyles } from './styles';

export const AlertDialog = AlertDialogPrimitive.AlertDialog;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const StyledOverlay = styled(AlertDialogPrimitive.Overlay, overlayStyles);

const StyledContent = styled(AlertDialogPrimitive.Content, contentStyles);

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
			<StyledContent>
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
