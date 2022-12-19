import toast from 'react-hot-toast';
import { Button } from '../../ui/Button';
import {
	Dialog,
	DialogButtonGroup,
	DialogCloseButton,
	DialogHeader,
	DialogTrigger,
	useDialog,
	useDialogContext,
} from '../../ui/Dialog';
import { Form, useZodForm } from '../../ui/Form';
import { Input } from '../../ui/Form/Input';
import { SubmitButton } from '../../ui/Form/SubmitButton';
import { emailSchema } from '../../utils/schema';
import { trpc } from '../../utils/trpc';

function NewEmailDialogContent() {
	const { setOpen } = useDialogContext();

	const context = trpc.useContext();

	const form = useZodForm({
		schema: emailSchema,
		defaultValues: {
			email: '',
		},
	});

	const { mutateAsync } = trpc.email.addEmail.useMutation({
		onSuccess(data) {
			context.email.getEmails.setData(undefined, (prev) => {
				if (data) {
					return [data, ...prev!];
				}

				return prev || [];
			});
			setOpen(false);
			toast.success('Email address successfully added.');
		},
		onError({ message, data }) {
			if (data?.code === 'CONFLICT') {
				form.setError('email', { message });
			}
		},
	});

	return (
		<>
			<DialogHeader title="New email" />

			<Form form={form} onSubmit={(data) => mutateAsync(data)} noValidate>
				<Input
					name="email"
					label="Email"
					placeholder="Enter your email address..."
					message="After adding a new email address, we will send you a verification email to verify it."
				/>

				<DialogButtonGroup role="group">
					<DialogCloseButton>Cancel</DialogCloseButton>
					<SubmitButton>Add email</SubmitButton>
				</DialogButtonGroup>
			</Form>
		</>
	);
}

export function NewEmailDialog({ disabled }: { disabled: boolean }) {
	const dialog = useDialog();

	return (
		<Dialog dialog={dialog} content={<NewEmailDialogContent />}>
			<DialogTrigger asChild>
				<Button disabled={disabled}>New email</Button>
			</DialogTrigger>
		</Dialog>
	);
}
