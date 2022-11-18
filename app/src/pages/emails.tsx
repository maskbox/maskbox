import { TrashIcon } from '@radix-ui/react-icons';
import toast from 'react-hot-toast';
import { NewEmailDialog } from '../components/dialogs/NewEmailDialog';
import { PageHeading, PageHeadingSkeleton } from '../components/PageHeading';
import { Skeleton } from '../components/Skeleton';
import { MAX_EMAILS_PER_ACCOUNT } from '../constants';
import { Alert } from '../ui/Alert';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger
} from '../ui/AlertDialog';
import { IconButton } from '../ui/IconButton';
import { styled } from '../utils/stitches';
import { trpc, type RouterOutputs } from '../utils/trpc';

const StyledTableContainer = styled('div', {
	overflowX: 'auto'
});

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
	userSelect: 'none',
	whiteSpace: 'nowrap',
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
	textAlign: 'left',
	whiteSpace: 'nowrap'
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

const StyledSkeletonTableHead = styled('div', {
	display: 'flex',
	alignItems: 'center',
	background: '$gray2',
	border: '1px solid $gray6',
	borderRadius: '0.375rem'
});

const StyledSkeletonTableHeadColumn = styled('div', {
	padding: '0.5rem 0.875rem',
	width: '50%'
});

const StyledSkeletonTableRow = styled('div', {
	display: 'flex',
	alignItems: 'center',
	'&:not(:last-of-type)': {
		borderBottom: '1px solid $gray6'
	}
});

const StyledSkeletonTableBodyColumn = styled('div', {
	padding: '0.75rem 0.875rem',
	width: '100%',
	'@sm': {
		width: '50%'
	}
});

function EmailRow({
	id,
	email,
	verifiedAt
}: RouterOutputs['email']['getEmails'][0]) {
	const context = trpc.useContext();
	const { mutate } = trpc.email.deleteEmail.useMutation({
		onSuccess(data) {
			context.email.getEmails.setData(undefined, (prev) =>
				prev!.filter(({ id }) => id !== data.id)
			);
			toast.success('Email address successfully deleted.');
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
	const { data } = trpc.email.getEmails.useQuery();

	if (!data) {
		return (
			<>
				<PageHeadingSkeleton />

				<StyledSkeletonTableHead>
					<StyledSkeletonTableHeadColumn>
						<Skeleton css={{ width: '4rem', height: '1rem' }} />
					</StyledSkeletonTableHeadColumn>

					<StyledSkeletonTableHeadColumn
						css={{
							display: 'none',
							'@sm': {
								width: '16.6%',
								display: 'block'
							}
						}}
					>
						<Skeleton css={{ width: '3rem', height: '1rem' }} />
					</StyledSkeletonTableHeadColumn>

					<StyledSkeletonTableHeadColumn
						css={{
							display: 'none',
							'@sm': {
								width: '16.6%',
								display: 'block'
							}
						}}
					>
						<Skeleton css={{ width: '5rem', height: '1rem' }} />
					</StyledSkeletonTableHeadColumn>
				</StyledSkeletonTableHead>

				{Array.from({ length: 5 }).map((_, i) => (
					<StyledSkeletonTableRow key={i}>
						<StyledSkeletonTableBodyColumn>
							<Skeleton
								css={{
									width: '100%',
									'@sm': {
										width: '12rem'
									}
								}}
							/>
						</StyledSkeletonTableBodyColumn>

						<StyledSkeletonTableBodyColumn
							css={{
								display: 'none',
								'@sm': {
									width: '16.6%',
									display: 'block'
								}
							}}
						>
							<Skeleton css={{ width: '4rem' }} />
						</StyledSkeletonTableBodyColumn>

						<StyledSkeletonTableBodyColumn
							css={{
								display: 'none',
								'@sm': {
									width: '16.6%',
									display: 'block'
								}
							}}
						>
							<Skeleton css={{ width: '6rem' }} />
						</StyledSkeletonTableBodyColumn>

						<StyledSkeletonTableBodyColumn
							css={{
								display: 'none',
								'@sm': {
									width: '16.6%',
									display: 'block'
								}
							}}
						>
							<Skeleton css={{ marginLeft: 'auto', width: '1.25rem' }} />
						</StyledSkeletonTableBodyColumn>
					</StyledSkeletonTableRow>
				))}
			</>
		);
	}

	return (
		<>
			{data.length === MAX_EMAILS_PER_ACCOUNT && (
				<Alert
					title="Emails limit reached"
					description="You reached the limit of maximum emails per account."
				/>
			)}

			<PageHeading
				title="Emails"
				description="Email addresses you can generate masks for."
			>
				<NewEmailDialog disabled={data.length === MAX_EMAILS_PER_ACCOUNT} />
			</PageHeading>

			<StyledTableContainer>
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
						{data.map((props) => (
							<EmailRow key={props.id} {...props} />
						))}
					</tbody>
				</StyledTable>
			</StyledTableContainer>
		</>
	);
}
