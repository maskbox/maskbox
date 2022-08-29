import { styled } from '../utils/stitches';
import { trpc } from '../utils/trpc';

const StyledHeading = styled('h1', {
	color: 'Red'
});

export default function Home() {
	const hello = trpc.useQuery(['example.hello']);

	return (
		<StyledHeading>
			{hello.data ? hello.data.message : 'Loading...'}
		</StyledHeading>
	);
}
