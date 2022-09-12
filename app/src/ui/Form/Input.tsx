import { ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';
import { Skeleton } from '../../components/Skeleton';
import { styled } from '../../utils/stitches';
import { AdditionalMessage } from './AdditionalMessage';

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
	message,
	css,
	...props
}: {
	name: string;
	label: string;
	placeholder: string;
	message?: string;
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
								boxShadow: '$colors$red9 0px 0px 0px 1px',
								'&:focus': {
									boxShadow: '$colors$red9 0px 0px 0px 1px'
								}
						  }
						: undefined
				}
				{...register(name)}
			/>

			<AdditionalMessage name={name} message={message} />
		</StyledGroup>
	);
}

export function InputSkeleton({
	message = true,
	...props
}: ComponentProps<typeof StyledGroup> & { message?: boolean }) {
	return (
		<StyledGroup {...props}>
			<Skeleton css={{ width: '30%', marginBottom: '0.25rem' }} />
			<Skeleton css={{ height: '2rem' }} />
			{message && (
				<Skeleton
					css={{ width: '50%', height: '1rem', marginTop: '0.375rem' }}
				/>
			)}
		</StyledGroup>
	);
}
