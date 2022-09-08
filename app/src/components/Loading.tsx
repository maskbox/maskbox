import { Puff } from 'react-loading-icons';
import { styled } from '../utils/stitches';

const StyledContainer = styled('main', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '100vh'
});

export function Loading() {
	return (
		<StyledContainer>
			<Puff width="80" height="80" />
		</StyledContainer>
	);
}
