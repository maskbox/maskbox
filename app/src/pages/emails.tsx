import { TrashIcon } from '@radix-ui/react-icons';
import { NewEmailDialog } from '../components/dialogs/NewEmailDialog';
import { PageHeading } from '../components/PageHeading';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger
} from '../ui/AlertDialog';
import { IconButton } from '../ui/IconButton';
import { styled } from '../utils/stitches';
import { InferQueryOutput, trpc } from '../utils/trpc';

const StyledTable = styled('table', {
	width: '100%',
	'&>tbody>tr:not(:last-of-type) td': {
		borderBottom: '1px solid $gray6'
	}
});

const StyledTableHeadColumn = styled('th', {
	padding: '0.5rem 0.875rem',
	fontSize: '$sm',
	fontWeight: '$medium',
	textAlign: 'left',
	background: '$gray2',
	color: '$gray11',
	borderTop: '1px solid $gray6',
	borderBottom: '1px solid $gray6',
	'&:first-child': {
		borderLeft: '1px solid $gray6',
		borderTopLeftRadius: '0.375rem',
		borderBottomLeftRadius: '0.375rem'
	},
	'&:last-child': {
		borderRight: '1px solid $gray6',
		borderTopRightRadius: '0.375rem',
		borderBottomRightRadius: '0.375rem'
	}
});

const StyledTableBodyColumn = styled('td', {
	padding: '0.75rem 0.875rem',
	textAlign: 'left'
});

const StyledStatusTag = styled('span', {
	fontSize: '$sm',
	padding: '0.25rem 0.375rem',
	borderRadius: '0.375rem',
	userSelect: 'none',
	variants: {
		variant: {
			success: {
				background: '$green3',
				color: '$green9'
			},
			danger: {
				background: '$red3',
				color: '$red10'
			}
		}
	}
});

const StyledEmailHighlight = styled('strong', {
	fontWeight: '$semibold',
	color: '$gray12'
});

function EmailRow({
	id,
	email,
	verifiedAt
}: InferQueryOutput<'email.getEmails'>[0]) {
	const { setQueryData } = trpc.useContext();
	const { mutate } = trpc.useMutation(['email.deleteEmail'], {
		onSuccess(data) {
			setQueryData(['email.getEmails'], (prev) =>
				prev!.filter(({ id }) => id !== data.id)
			);
		}
	});

	return (
		<tr>
			<StyledTableBodyColumn>{email}</StyledTableBodyColumn>
			<StyledTableBodyColumn>
				{verifiedAt ? (
					<StyledStatusTag variant="success">Verified</StyledStatusTag>
				) : (
					<StyledStatusTag variant="danger">Unverified</StyledStatusTag>
				)}
			</StyledTableBodyColumn>
			<StyledTableBodyColumn>
				{verifiedAt
					? verifiedAt.toLocaleDateString([], { dateStyle: 'medium' })
					: '-'}
			</StyledTableBodyColumn>

			<StyledTableBodyColumn css={{ textAlign: 'right' }}>
				<AlertDialog>
					<IconButton
						variant="danger"
						label="Delete"
						tooltipSide="left"
						as={AlertDialogTrigger}
					>
						<TrashIcon />
					</IconButton>

					<AlertDialogContent
						title="Delete email"
						description={
							<>
								This action cannot be undone. This will permanently delete your
								email <StyledEmailHighlight>{email}</StyledEmailHighlight> and
								all masks assigned to it.
							</>
						}
						actionLabel="Delete"
						onAction={() => mutate({ id })}
					/>
				</AlertDialog>
			</StyledTableBodyColumn>
		</tr>
	);
}

export default function Emails() {
	const { data } = trpc.useQuery(['email.getEmails']);

	return (
		<>
			<PageHeading
				title="Emails"
				description="Email addresses you can generate masks for."
			>
				<NewEmailDialog />
			</PageHeading>

			<StyledTable>
				<thead>
					<tr>
						<StyledTableHeadColumn css={{ width: '50%' }}>
							Email
						</StyledTableHeadColumn>
						<StyledTableHeadColumn>Status</StyledTableHeadColumn>
						<StyledTableHeadColumn>Verified at</StyledTableHeadColumn>
						<StyledTableHeadColumn />
					</tr>
				</thead>
				<tbody>
					{data?.map((props) => (
						<EmailRow key={props.id} {...props} />
					))}
				</tbody>
			</StyledTable>
		</>
	);
}
