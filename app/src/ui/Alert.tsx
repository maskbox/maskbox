import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { styled } from '../utils/stitches';

const StyledCard = styled('div', {
	marginBottom: '1.25rem',
	padding: '1rem',
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	background: '$gray2',
	borderRadius: '0.375rem',
	boxShadow: '$border1',
});

const StyledIcon = styled(ExclamationTriangleIcon, {
	flexShrink: 0,
	color: '$red11',
});

const StyledContainer = styled('div', {
	marginLeft: '0.75rem',
});

const StyledTitle = styled('p', {
	marginBottom: '0.125rem',
	fontWeight: '$semibold',
});

const StyledDescription = styled('p', {
	color: '$gray11',
});

export function Alert({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<StyledCard>
			<StyledIcon width="24" height="24" />

			<StyledContainer>
				<StyledTitle>{title}</StyledTitle>
				<StyledDescription>{description}</StyledDescription>
			</StyledContainer>
		</StyledCard>
	);
}
