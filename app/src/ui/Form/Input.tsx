import { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';
import { styled } from '../../utils/stitches';
import { ErrorMessage } from './ErrorMessage';

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
	baseTransition: 'box-shadow',
	boxShadow: '$border1',
	borderRadius: '0.375rem',
	'&::placeholder': {
		color: '$gray9'
	},
	'&:focus': {
		boxShadow: '$border2'
	}
});

export function Input({
	name,
	type = 'text',
	label,
	placeholder,
	css,
	...props
}: {
	name: string;
	label: string;
	placeholder: string;
} & ComponentProps<typeof StyledInput>) {
	const {
		register,
		formState: { errors }
	} = useFormContext();

	return (
		<StyledGroup role="group" css={css}>
			<StyledLabel htmlFor={name}>{label}</StyledLabel>

			<StyledInput
				{...props}
				type={type}
				id={name}
				placeholder={placeholder}
				css={
					errors[name]
						? {
								borderColor: '$red9',
								'&:focus': {
									borderColor: '$red9'
								}
						  }
						: undefined
				}
				{...register(name)}
			/>

			<ErrorMessage name={name} errors={errors} />
		</StyledGroup>
	);
}
