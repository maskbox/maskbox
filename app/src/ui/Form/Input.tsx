import { HTMLInputTypeAttribute } from 'react';
import { styled } from '../../utils/stitches';

const StyledGroup = styled('div', {
	width: '100%',
	display: 'flex',
	flexDirection: 'column'
});

const StyledLabel = styled('label', {
	width: 'fit-content',
	fontWeight: '$semibold',
	marginBottom: '0.25rem'
});

const StyledInput = styled('input', {
	padding: '0.375rem 0.75rem',
	background: '$gray3',
	baseTransition: 'border-color',
	border: '1px solid $colors$gray6',
	borderRadius: '0.375rem',
	'&::placeholder': {
		color: '$gray9'
	},
	'&:focus': {
		borderColor: '$gray8'
	}
});

export function Input({
	name,
	type,
	label,
	placeholder
}: {
	name: string;
	type: HTMLInputTypeAttribute;
	label: string;
	placeholder: string;
}) {
	return (
		<StyledGroup role="group">
			<StyledLabel htmlFor={name}>{label}</StyledLabel>

			<StyledInput
				type={type}
				id={name}
				name={name}
				placeholder={placeholder}
			/>
		</StyledGroup>
	);
}
