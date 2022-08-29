import { styled } from '../stitches';

const StyledHeading = styled('h1', {
	color: 'Red'
});

export default function Home() {
	return <StyledHeading>Hello world!</StyledHeading>;
}
