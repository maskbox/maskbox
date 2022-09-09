import { TrashIcon } from '@radix-ui/react-icons';
import { NewEmailDialog } from '../components/dialogs/NewEmailDialog';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTrigger
} from '../ui/AlertDialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/Tooltip';
import { styled } from '../utils/stitches';
import { InferQueryOutput, trpc } from '../utils/trpc';

const StyledHeadingContainer = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginBottom: '1.25rem'
});

const StyledHeading = styled('h1', {
	fontSize: '$xl',
	fontWeight: '$semibold'
});

const StyledDescription = styled('p', {
	marginTop: '0.25rem',
	color: '$gray11'
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

const StyledActionButton = styled('button', {
	margin: '-0.25rem',
	padding: '0.25rem',
	color: '$red11',
	borderRadius: '0.25rem',
	baseTransition: 'background, color',
	'&:hover': {
		background: '$gray3',
		color: '$red12'
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
				{verifiedAt ? 'Verified' : 'Unverified'}
			</StyledTableBodyColumn>
			<StyledTableBodyColumn>
				{verifiedAt
					? verifiedAt.toLocaleDateString([], { dateStyle: 'medium' })
					: '-'}
			</StyledTableBodyColumn>

			<StyledTableBodyColumn css={{ textAlign: 'right' }}>
				<AlertDialog>
					<Tooltip>
						<TooltipTrigger asChild>
							<AlertDialogTrigger asChild>
								<StyledActionButton>
									<TrashIcon />
								</StyledActionButton>
							</AlertDialogTrigger>
						</TooltipTrigger>

						<TooltipContent side="left">Delete</TooltipContent>
					</Tooltip>

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
			<StyledHeadingContainer>
				<div>
					<StyledHeading>Emails</StyledHeading>
					<StyledDescription>
						Email addresses you can generate masks for.
					</StyledDescription>
				</div>

				<NewEmailDialog />
			</StyledHeadingContainer>

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
