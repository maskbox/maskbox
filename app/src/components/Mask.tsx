import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import {
	CheckIcon,
	ChevronDownIcon,
	CopyIcon,
	TrashIcon,
} from '@radix-ui/react-icons';
import copy from 'copy-to-clipboard';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { RELAY_DOMAIN } from '../constants';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger,
} from '../ui/AlertDialog';
import { IconButton } from '../ui/IconButton';
import { keyframes, styled } from '../utils/stitches';
import { trpc, type RouterOutputs } from '../utils/trpc';

const COPY_TIMEOUT = 1000;

const contentOpen = keyframes({
	from: { height: 0, opacity: 0 },
	to: { height: 'var(--radix-collapsible-content-height)', opacity: 1 },
});

const contentClose = keyframes({
	from: { height: 'var(--radix-collapsible-content-height)', opacity: 1 },
	to: { height: 0, opacity: 0 },
});

const StyledRoot = styled(CollapsiblePrimitive.Root, {
	padding: '1rem',
	width: '100%',
	background: '$gray2',
	borderRadius: '0.375rem',
	boxShadow: '$border1',
	'&:not(:last-of-type)': {
		marginBottom: '0.75rem',
	},
});

const StyledHeader = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
});

const StyledTrigger = styled(CollapsiblePrimitive.Trigger, {
	maxWidth: '75%',
	color: '$gray11',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
});

const StyledMaskName = styled('span', {
	marginRight: '0.25rem',
	fontWeight: '$semibold',
	color: '$gray12',
});

const StyledButtonGroup = styled('div', {
	display: 'flex',
	alignItems: 'center',
	'&>button:not(:last-of-type)': {
		marginRight: '0.375rem',
	},
});

const StyledContent = styled(CollapsiblePrimitive.Content, {
	overflow: 'hidden',
	'&[data-state="open"]': {
		animation: `${contentOpen} 150ms ease-in-out`,
	},
	'&[data-state="closed"]': {
		animation: `${contentClose} 150ms ease-in-out`,
	},
});

const StyledContentContainer = styled('div', {
	marginTop: '1.125rem',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	'@md': {
		flexDirection: 'row',
		alignItems: 'end',
	},
});

const StyledItem = styled('div', {
	width: 'auto',
	'@lg': {
		width: '26rem',
	},
	'&:not(:last-of-type)': {
		marginBottom: '0.5rem',
		'@md': {
			marginBottom: 0,
		},
	},
});

const StyledItemLabel = styled('p', {
	marginBottom: '0.125rem',
	fontSize: '$sm',
	fontWeight: '$medium',
	color: '$gray11',
	userSelect: 'none',
});

const StyledMaskHighlight = styled('strong', {
	fontWeight: '$semibold',
	color: '$gray12',
});

const CollapseIcon = motion(ChevronDownIcon);

export default function Mask({
	id,
	identifier,
	name,
	forwardTo,
	createdAt,
}: RouterOutputs['mask']['getMasks'][0]) {
	const [open, setOpen] = useState(false);
	const [copied, setCopied] = useState(false);

	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const context = trpc.useContext();
	const { mutate } = trpc.mask.deleteMask.useMutation({
		onSuccess(data) {
			context.mask.getMasks.setData(undefined, (prev) =>
				prev!.filter(({ id }) => id !== data.id)
			);
			toast.success('Mask successfully deleted.');
		},
	});

	useEffect(() => {
		return () => {
			timeoutRef.current && clearTimeout(timeoutRef.current);
		};
	}, []);

	const maskAddress = `${identifier}@${RELAY_DOMAIN}`;

	function copyMaskAddress() {
		copy(maskAddress);

		setCopied(true);
		timeoutRef.current = setTimeout(() => setCopied(false), COPY_TIMEOUT);
	}

	return (
		<StyledRoot open={open} onOpenChange={(val) => setOpen(val)}>
			<StyledHeader>
				<StyledTrigger>
					<StyledMaskName>{name ? name : identifier}</StyledMaskName>
					<span>({maskAddress})</span>
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
						<CollapseIcon
							initial={{ rotate: 0 }}
							animate={open ? { rotate: 180 } : { rotate: 0 }}
							transition={{ duration: 0.15, ease: 'easeInOut' }}
						/>
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
