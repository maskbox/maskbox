import { ComponentProps } from 'react';
import { styled } from '../utils/stitches';

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

export function PageHeading({
	title,
	description,
	children,
	...props
}: ComponentProps<typeof StyledHeadingContainer> & {
	title: string;
	description: string;
}) {
	return (
		<StyledHeadingContainer {...props}>
			<div>
				<StyledHeading>{title}</StyledHeading>
				<StyledDescription>{description}</StyledDescription>
			</div>

			{children}
		</StyledHeadingContainer>
	);
}
