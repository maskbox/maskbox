import { TooltipContentProps } from '@radix-ui/react-tooltip';
import { ComponentProps, ComponentType, ReactNode } from 'react';
import { styled } from '../utils/stitches';
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';

interface Props extends ComponentProps<typeof StyledIconButton> {
	label?: string;
	as?: ComponentType<any>;
	tooltipDelayDuration?: number;
	tooltipSide?: TooltipContentProps['side'];
	children: ReactNode;
}

const StyledIconButton = styled('button', {
	margin: '-0.25rem',
	padding: '0.25rem',
	borderRadius: '0.25rem',
	baseTransition: 'background, color',
	'&:hover': {
		background: '$gray3',
	},
	variants: {
		variant: {
			primary: {
				color: '$gray11',
				'&:hover': {
					color: '$gray12',
				},
			},
			success: {
				color: '$green11',
			},
			danger: {
				color: '$red11',
				'&:hover': {
					color: '$red12',
				},
			},
		},
	},
	defaultVariants: {
		variant: 'primary',
	},
});

export function IconButton({
	label,
	tooltipDelayDuration,
	tooltipSide,
	...props
}: Props) {
	if (!label) {
		return <StyledIconButton {...props} />;
	}

	return (
		<Tooltip delayDuration={tooltipDelayDuration}>
			<TooltipTrigger asChild>
				<StyledIconButton {...props} />
			</TooltipTrigger>
			<TooltipContent side={tooltipSide}>{label}</TooltipContent>
		</Tooltip>
	);
}
