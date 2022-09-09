import { StackIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/Button';
import { styled } from '../utils/stitches';

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
	return (
		<StyledEmptyContainer>
			<StackIcon width="64" height="64" />
			<StyledEmptyHeader>Welcome to Maskbox</StyledEmptyHeader>
			<StyledEmptyDescription>
				There are no masks yet. To start using Maskbox, you need to generate
				your first mask.
			</StyledEmptyDescription>
			<Button>Get started</Button>
		</StyledEmptyContainer>
	);
}
