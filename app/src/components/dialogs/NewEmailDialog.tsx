import { Button } from '../../ui/Button';
import {
	Dialog,
	DialogButtonGroup,
	DialogCloseButton,
	DialogHeader,
	DialogTrigger,
	useDialog,
	useDialogContext
} from '../../ui/Dialog';
import { Form, useZodForm } from '../../ui/Form';
import { Input } from '../../ui/Form/Input';
import { SubmitButton } from '../../ui/Form/SubmitButton';
import { emailSchema } from '../../utils/schema';
import { trpc } from '../../utils/trpc';

function NewEmailDialogContent() {
	const { setOpen } = useDialogContext();

	const { setQueryData } = trpc.useContext();
	const { mutateAsync } = trpc.useMutation(['email.addEmail'], {
		onSuccess(data) {
			setQueryData(['email.getEmails'], (prev) => [data, ...prev!]);
			setOpen(false);
		}
	});

	const form = useZodForm({
		schema: emailSchema,
		defaultValues: {
			email: ''
		}
	});

	return (
		<>
			<DialogHeader
				title="New email"
				description="After adding a new email address, we will send you a verification email to verify it."
			/>

			<Form form={form} onSubmit={(data) => mutateAsync(data)} noValidate>
				<Input
					name="email"
					label="Email"
					placeholder="Enter your email address..."
				/>

				<DialogButtonGroup role="group">
					<DialogCloseButton>Cancel</DialogCloseButton>
					<SubmitButton>Add email</SubmitButton>
				</DialogButtonGroup>
			</Form>
		</>
	);
}

export function NewEmailDialog() {
	const dialog = useDialog();

	return (
		<Dialog dialog={dialog} content={<NewEmailDialogContent />}>
			<DialogTrigger asChild>
				<Button>New email</Button>
			</DialogTrigger>
		</Dialog>
	);
}
