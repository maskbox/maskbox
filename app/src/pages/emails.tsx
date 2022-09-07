import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/Button';
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

function EmailRow({
	email,
	verifiedAt
}: InferQueryOutput<'email.getMyEmails'>[0]) {
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
			<StyledTableBodyColumn css={{ textAlign: 'right', color: '$gray11' }}>
				<button>
					<DotsVerticalIcon />
				</button>
			</StyledTableBodyColumn>
		</tr>
	);
}

export default function Emails() {
	const { data } = trpc.useQuery(['email.getMyEmails']);

	return (
		<>
			<StyledHeadingContainer>
				<div>
					<StyledHeading>Emails</StyledHeading>
					<StyledDescription>
						Email addresses you can generate masks for.
					</StyledDescription>
				</div>

				<Button>New email</Button>
			</StyledHeadingContainer>

			<StyledTable>
				<thead>
					<tr>
						<StyledTableHeadColumn>Email</StyledTableHeadColumn>
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
