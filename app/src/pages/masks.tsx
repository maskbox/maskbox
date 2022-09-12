import { StackIcon } from '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
import { NewMaskDialog } from '../components/dialogs/NewMaskDialog';
import { PageHeading } from '../components/PageHeading';
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

export default function Masks() {
	const { data } = trpc.useQuery(['mask.getMasks']);

	if (!data?.length) {
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
