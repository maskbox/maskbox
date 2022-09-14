import { ComponentProps } from 'react';
import { styled } from '../utils/stitches';
import { Skeleton } from './Skeleton';

const StyledHeadingContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	marginBottom: '1.25rem',
	'@md': {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
});

const StyledTextContainer = styled('div', {
	marginBottom: '0.75rem',
	'@md': {
		marginBottom: 0
	}
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
			<StyledTextContainer>
				<StyledHeading>{title}</StyledHeading>
				<StyledDescription>{description}</StyledDescription>
			</StyledTextContainer>

			{children}
		</StyledHeadingContainer>
	);
}

export function PageHeadingSkeleton() {
	return (
		<StyledHeadingContainer>
			<div>
				<Skeleton css={{ width: '6rem', height: '1.75rem' }} />
				<Skeleton css={{ marginTop: '0.25rem', width: '24rem' }} />
			</div>

			<Skeleton css={{ width: '6rem', height: '2rem' }} />
		</StyledHeadingContainer>
	);
}
