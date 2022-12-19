import { FallbackProps } from 'react-error-boundary';
import { Button } from '../ui/Button';
import { styled } from '../utils/stitches';

const StyledMain = styled('main', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '100vh',
});

const StyledContent = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '24rem',
});

const StyledHeading = styled('h1', {
	fontSize: '$xl',
	fontWeight: '$semibold',
	marginBottom: '1.25rem',
});

const StyledPre = styled('pre', {
	width: '100%',
	textAlign: 'center',
	color: '$gray11',
	whiteSpace: 'pre-wrap',
});

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	return (
		<StyledMain>
			<StyledContent>
				<StyledHeading>Something went wrong</StyledHeading>

				<StyledPre>{error.message}</StyledPre>

				<Button
					css={{ marginTop: '1.75rem' }}
					onClick={() => resetErrorBoundary()}
				>
					Try again
				</Button>
			</StyledContent>
		</StyledMain>
	);
}
