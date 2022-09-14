import { StackIcon } from '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
import { NewMaskDialog } from '../components/dialogs/NewMaskDialog';
import { PageHeading, PageHeadingSkeleton } from '../components/PageHeading';
import { Skeleton } from '../components/Skeleton';
import { MAX_MASKS_PER_ACCOUNT } from '../constants';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { styled } from '../utils/stitches';
import { trpc } from '../utils/trpc';

const Mask = dynamic(() => import('../components/Mask'));

const StyledEmptyContainer = styled('div', {
	margin: 'auto',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
	height: '100%',
	maxWidth: '24rem',
	textAlign: 'center'
});

const StyledEmptyHeader = styled('h1', {
	marginTop: '1rem',
	fontSize: '$xl',
	fontWeight: '$semibold'
});

const StyledEmptyDescription = styled('p', {
	marginTop: '0.375rem',
	marginBottom: '1.5rem',
	color: '$gray11'
});

const StyledEmptyMask = styled('div', {
	padding: '1rem',
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	background: '$gray2',
	borderRadius: '0.375rem',
	boxShadow: '$border1',
	'&:not(:last-of-type)': {
		marginBottom: '0.75rem'
	}
});

const StyledEmptyMaskGroup = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: '0.25rem'
});

export default function Masks() {
	const { data } = trpc.useQuery(['mask.getMasks']);

	if (!data) {
		return (
			<>
				<PageHeadingSkeleton />

				{Array.from({ length: 5 }).map((_, i) => (
					<StyledEmptyMask key={i}>
						<Skeleton css={{ width: '18rem' }} />

						<StyledEmptyMaskGroup>
							<Skeleton css={{ width: '1.25rem' }} />
							<Skeleton css={{ width: '1.25rem' }} />
							<Skeleton css={{ width: '1.25rem' }} />
						</StyledEmptyMaskGroup>
					</StyledEmptyMask>
				))}
			</>
		);
	}

	if (!data.length) {
		return (
			<StyledEmptyContainer>
				<StackIcon width="64" height="64" />
				<StyledEmptyHeader>Welcome to Maskbox</StyledEmptyHeader>
				<StyledEmptyDescription>
					There are no masks yet. To start using Maskbox, you need to generate
					your first mask.
				</StyledEmptyDescription>
				<NewMaskDialog trigger={<Button>Get started</Button>} />
			</StyledEmptyContainer>
		);
	}

	return (
		<>
			{data.length === MAX_MASKS_PER_ACCOUNT && (
				<Alert
					title="Masks limit reached"
					description="You reached the limit of maximum masks per account."
				/>
			)}

			<PageHeading
				title="Masks"
				description="Masks are masked email addresses that forward emails to your real email address."
			>
				<NewMaskDialog
					trigger={
						<Button disabled={data.length === MAX_MASKS_PER_ACCOUNT}>
							New mask
						</Button>
					}
				/>
			</PageHeading>

			{data.map((props) => (
				<Mask key={props.id} {...props} />
			))}
		</>
	);
}
