import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { Toaster as ReactHotToaster } from 'react-hot-toast';
import { css, styled } from '../utils/stitches';

const toaster = css({
	background: '$gray2 !important',
	color: '$gray12 !important',
	boxShadow: '$border1, $base !important',
	borderRadius: '0.375rem !important'
});

const StyledSuccessIcon = styled(CheckCircledIcon, {
	color: '$green11'
});

const StyledErrorIcon = styled(CrossCircledIcon, {
	color: '$red11'
});

export const Toaster = () => (
	<ReactHotToaster
		toastOptions={{
			position: 'bottom-right',
			duration: 2000,
			className: toaster(),
			success: {
				icon: <StyledSuccessIcon width="20" height="20" />
			},
			error: {
				icon: <StyledErrorIcon width="20" height="20" />
			}
		}}
	/>
);
