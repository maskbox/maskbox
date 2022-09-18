import { styled } from '../utils/stitches';

const StyledHeader = styled('div', {
	padding: '0 6rem',
	height: '100vh',
	display: 'flex',
	alignItems: 'center'
});

const StyledTitle = styled('h1', {
	fontSize: '2.75rem',
	fontWeight: '$bold',
	lineHeight: '1.375'
});

const StyledDescription = styled('p', {
	fontSize: '$xl'
});

export default function Home() {
	return (
		<StyledHeader>
			<div>
				<StyledTitle>Keep your online identity hidden and secure</StyledTitle>
				<StyledDescription>TODO</StyledDescription>
				<button>Start now for free</button>
			</div>
		</StyledHeader>
	);
}

Home.layout = 'landing';
