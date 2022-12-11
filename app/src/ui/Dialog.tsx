import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import { styled } from '../utils/stitches';
import { Button, ButtonProps } from './Button';
import {
	contentCloseAnimationProps,
	contentOpenAnimationProps,
	contentStyles,
	overlayCloseAnimationProps,
	overlayOpenAnimationProps,
	overlayStyles,
} from './styles';

interface DialogContext {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogContext = createContext<DialogContext>({
	open: false,
	setOpen: () => {},
});

const StyledOverlay = styled(motion.div, overlayStyles);

const StyledContent = styled(motion.div, contentStyles);

const StyledHeader = styled('div', {
	marginBottom: '1.5rem',
});

const StyledHeaderRow = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
});

const StyledCrossButton = styled(DialogPrimitive.Close, {
	marginRight: '-0.125rem',
	padding: '0.125rem',
	color: '$gray11',
	borderRadius: '0.25rem',
	baseTransition: 'background, color',
	'&:hover': {
		background: '$gray3',
		color: '$gray12',
	},
});

const StyledTitle = styled(DialogPrimitive.Title, {
	fontSize: '$xl',
	fontWeight: '$semibold',
});

const StyledDescription = styled(DialogPrimitive.Description, {
	marginTop: '0.25rem',
	fontSize: '$sm',
	color: '$gray11',
});

export const DialogButtonGroup = styled('div', {
	display: 'flex',
	justifyContent: 'end',
	marginTop: '1rem',
	'&>*:not(:last-of-type)': {
		marginRight: '0.5rem',
	},
});

export const DialogTrigger = DialogPrimitive.Trigger;

export function useDialog() {
	const [open, setOpen] = useState(false);

	return { open, setOpen };
}

export const useDialogContext = () => useContext(DialogContext);

export function DialogHeader({
	title,
	description,
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

export function Dialog({
	dialog,
	content,
	children,
}: {
	dialog: DialogContext;
	content: ReactNode;
	children: ReactNode;
}) {
	return (
		<DialogContext.Provider value={dialog}>
			<DialogPrimitive.Dialog
				open={dialog.open}
				onOpenChange={(val) => dialog.setOpen(val)}
			>
				{children}

				<AnimatePresence>
					{dialog.open && (
						<DialogPrimitive.Portal forceMount>
							<DialogPrimitive.Overlay asChild>
								<StyledOverlay
									initial={overlayCloseAnimationProps}
									animate={overlayOpenAnimationProps}
									exit={overlayCloseAnimationProps}
									transition={{ duration: 0.15, ease: 'easeInOut' }}
								/>
							</DialogPrimitive.Overlay>

							<DialogPrimitive.Content asChild>
								<StyledContent
									initial={contentOpenAnimationProps}
									animate={contentCloseAnimationProps}
									exit={contentOpenAnimationProps}
									transition={{ duration: 0.15, ease: 'easeInOut' }}
								>
									{content}
								</StyledContent>
							</DialogPrimitive.Content>
						</DialogPrimitive.Portal>
					)}
				</AnimatePresence>
			</DialogPrimitive.Dialog>
		</DialogContext.Provider>
	);
}
