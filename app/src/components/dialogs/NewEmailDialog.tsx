import { Button } from '../../ui/Button';
import {
	Dialog,
	DialogButtonGroup,
	DialogCloseButton,
	DialogContent,
	DialogHeader,
	DialogTrigger,
	useDialog
} from '../../ui/Dialog';
import { Form, useZodForm } from '../../ui/Form';
import { Input } from '../../ui/Form/Input';
import { SubmitButton } from '../../ui/Form/SubmitButton';
import { emailSchema } from '../../utils/schema';
import { trpc } from '../../utils/trpc';

export function NewEmailDialog() {
	const dialog = useDialog();
	const form = useZodForm({
		schema: emailSchema,
		defaultValues: {
			email: ''
		}
	});

	const { setQueryData } = trpc.useContext();
	const { mutateAsync } = trpc.useMutation(['email.addEmail'], {
		onSuccess(data) {
			setQueryData(['email.getEmails'], (prev) => [data, ...prev!]);
			dialog.setOpen(false);
		}
	});

	return (
		<Dialog dialog={dialog}>
			<DialogTrigger asChild>
				<Button>New email</Button>
			</DialogTrigger>

			<DialogContent onCloseAutoFocus={() => form.reset()}>
				<DialogHeader
					title="New email"
					description="After adding a new email, we will send you a verification email to verify it."
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
			</DialogContent>
		</Dialog>
	);
}
