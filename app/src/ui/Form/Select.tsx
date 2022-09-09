import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon
} from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CSS } from '@stitches/react';
import { ComponentProps, ReactNode } from 'react';
import { Controller } from 'react-hook-form';
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

const StyledTrigger = styled(SelectPrimitive.Trigger, {
	padding: '0.375rem 0.75rem',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	background: '$gray3',
	boxShadow: '$border1',
	borderRadius: '0.375rem',
	userSelect: 'none'
});

const StyledContent = styled(SelectPrimitive.Content, {
	width: '100%',
	backgroundColor: '$gray3',
	borderRadius: '0.375rem',
	overflow: 'hidden',
	userSelect: 'none',
	boxShadow: '$border1, $base'
});

const StyledItem = styled(SelectPrimitive.Item, {
	position: 'relative',
	padding: '0.375rem 0.75rem 0.375rem 1.75rem',
	display: 'flex',
	alignItems: 'center',
	baseTransition: 'background',
	outline: 'none',
	'&[data-highlighted]': {
		cursor: 'pointer',
		background: '$gray5'
	}
});

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
	position: 'absolute',
	left: '0.375rem',
	width: '1rem',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center'
});

const scrollButtonStyles: CSS = {
	padding: '0.25rem 0',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: '$gray11',
	cursor: 'default'
};

const StyledScrollUpButton = styled(
	SelectPrimitive.ScrollUpButton,
	scrollButtonStyles
);
const StyledScrollDownButton = styled(
	SelectPrimitive.ScrollDownButton,
	scrollButtonStyles
);

export function SelectItem({
	children,
	...props
}: ComponentProps<typeof StyledItem>) {
	return (
		<StyledItem {...props}>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

			<StyledItemIndicator>
				<CheckIcon />
			</StyledItemIndicator>
		</StyledItem>
	);
}

export function Select({
	name,
	label,
	css,
	children
}: {
	name: string;
	label: string;
	css: CSS;
	children: ReactNode;
}) {
	return (
		<Controller
			name={name}
			render={({ field: { value, onChange } }) => (
				<StyledGroup role="group" css={css}>
					<StyledLabel>{label}</StyledLabel>

					<SelectPrimitive.Root value={value} onValueChange={onChange}>
						<StyledTrigger aria-label={label}>
							<SelectPrimitive.Value />

							<SelectPrimitive.SelectIcon>
								<ChevronDownIcon />
							</SelectPrimitive.SelectIcon>
						</StyledTrigger>

						<SelectPrimitive.Portal>
							<StyledContent>
								<StyledScrollUpButton>
									<ChevronUpIcon />
								</StyledScrollUpButton>

								<SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>

								<StyledScrollDownButton>
									<ChevronDownIcon />
								</StyledScrollDownButton>
							</StyledContent>
						</SelectPrimitive.Portal>
					</SelectPrimitive.Root>
				</StyledGroup>
			)}
		/>
	);
}
