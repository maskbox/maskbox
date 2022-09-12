import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import {
	CheckIcon,
	ChevronDownIcon,
	CopyIcon,
	TrashIcon
} from '@radix-ui/react-icons';
import copy from 'copy-to-clipboard';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger
} from '../ui/AlertDialog';
import { IconButton } from '../ui/IconButton';
import { keyframes, styled } from '../utils/stitches';
import { InferQueryOutput, trpc } from '../utils/trpc';

const COPY_TIMEOUT = 1000;

const contentOpen = keyframes({
	from: { height: 0, opacity: 0 },
	to: { height: 'var(--radix-collapsible-content-height)', opacity: 1 }
});

const contentClose = keyframes({
	from: { height: 'var(--radix-collapsible-content-height)', opacity: 1 },
	to: { height: 0, opacity: 0 }
});

const StyledRoot = styled(CollapsiblePrimitive.Root, {
	padding: '1rem',
	width: '100%',
	background: '$gray2',
	borderRadius: '0.375rem',
	boxShadow: '$border1',
	'&:not(:last-of-type)': {
		marginBottom: '0.75rem'
	}
});

const StyledHeader = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between'
});

const StyledTrigger = styled(CollapsiblePrimitive.Trigger, {
	fontWeight: '$semibold'
});

const StyledMaskAddress = styled('span', {
	marginLeft: '0.25rem',
	fontWeight: '$normal',
	color: '$gray11'
});

const StyledButtonGroup = styled('div', {
	display: 'flex',
	alignItems: 'center',
	'&>button:not(:last-of-type)': {
		marginRight: '0.375rem'
	}
});

const StyledContent = styled(CollapsiblePrimitive.Content, {
	overflow: 'hidden',
	'&[data-state="open"]': {
		animation: `${contentOpen} 150ms ease-in-out`
	},
	'&[data-state="closed"]': {
		animation: `${contentClose} 150ms ease-in-out`
	}
});

const StyledContentContainer = styled('div', {
	marginTop: '1.125rem',
	display: 'flex',
	alignItems: 'end',
	justifyContent: 'space-between'
});

const StyledItem = styled('div', {
	width: '26rem'
});

const StyledItemLabel = styled('p', {
	marginBottom: '0.125rem',
	fontSize: '$sm',
	fontWeight: '$medium',
	color: '$gray11',
	userSelect: 'none'
});

const StyledMaskHighlight = styled('strong', {
	fontWeight: '$semibold',
	color: '$gray12'
});

export default function Mask({
	id,
	identifier,
	name,
	forwardTo,
	createdAt
}: InferQueryOutput<'mask.getMasks'>[0]) {
	const [open, setOpen] = useState(false);
	const [copied, setCopied] = useState(false);

	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const { setQueryData } = trpc.useContext();
	const { mutate } = trpc.useMutation(['mask.deleteMask'], {
		onSuccess(data) {
			setQueryData(['mask.getMasks'], (prev) =>
				prev!.filter(({ id }) => id !== data.id)
			);
		}
	});

	useEffect(() => {
		return () => {
			timeoutRef.current && clearTimeout(timeoutRef.current);
		};
	}, []);

	const maskAddress = `${identifier}@relay.maskbox.app`;

	function copyMaskAddress() {
		copy(maskAddress);

		setCopied(true);
		timeoutRef.current = setTimeout(() => setCopied(false), COPY_TIMEOUT);
	}

	return (
		<StyledRoot open={open} onOpenChange={(val) => setOpen(val)}>
			<StyledHeader>
				<StyledTrigger>
					{name ? name : identifier}
					<StyledMaskAddress>({maskAddress})</StyledMaskAddress>
				</StyledTrigger>

				<StyledButtonGroup>
					<AlertDialog>
						<IconButton
							variant="danger"
							label="Delete"
							tooltipSide="top"
							as={AlertDialogTrigger}
						>
							<TrashIcon />
						</IconButton>

						<AlertDialogContent
							title="Delete mask"
							description={
								<>
									This action cannot be undone. This will permanently delete
									your mask{' '}
									<StyledMaskHighlight>
										{name ? name : identifier}
									</StyledMaskHighlight>
									.
								</>
							}
							actionLabel="Delete"
							onAction={() => mutate({ id })}
						/>
					</AlertDialog>

					<IconButton
						variant={copied ? 'success' : 'primary'}
						label={copied ? undefined : 'Copy mask address'}
						tooltipSide="top"
						onClick={copyMaskAddress}
					>
						{copied ? <CheckIcon /> : <CopyIcon />}
					</IconButton>

					<IconButton
						label={open ? 'Hide details' : 'Show details'}
						tooltipSide="top"
						as={CollapsiblePrimitive.Trigger}
					>
						<motion.div
							initial={{ rotate: 0 }}
							animate={open ? { rotate: 180 } : { rotate: 0 }}
							transition={{ duration: 0.15, ease: 'easeInOut' }}
						>
							<ChevronDownIcon />
						</motion.div>
					</IconButton>
				</StyledButtonGroup>
			</StyledHeader>

			<StyledContent>
				<StyledContentContainer>
					<StyledItem>
						<StyledItemLabel>Mask address</StyledItemLabel>
						<p>{maskAddress}</p>
					</StyledItem>

					<StyledItem>
						<StyledItemLabel>Forward emails to</StyledItemLabel>
						<p>{forwardTo.email}</p>
					</StyledItem>

					<StyledItem css={{ width: 'auto' }}>
						<StyledItemLabel>Created at</StyledItemLabel>
						<p>{createdAt.toLocaleDateString([], { dateStyle: 'medium' })}</p>
					</StyledItem>
				</StyledContentContainer>
			</StyledContent>
		</StyledRoot>
	);
}
