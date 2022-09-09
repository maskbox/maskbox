import { ReactNode, Suspense } from 'react';
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
import { Select, SelectItem } from '../../ui/Form/Select';
import { SubmitButton } from '../../ui/Form/SubmitButton';
import { ALGORITHMS, maskSchema } from '../../utils/schema';
import { trpc } from '../../utils/trpc';

function capitalize(str: string) {
	return str.charAt(0) + str.slice(1).toLowerCase();
}

// TODO: Add help messages:
function NewMaskDialogForm() {
	const { data } = trpc.useQuery(['email.getEmails', { onlyVerified: true }], {
		suspense: true
	});
	const { mutateAsync } = trpc.useMutation('mask.addMask');

	const form = useZodForm({
		schema: maskSchema,
		defaultValues: {
			forwardTo: data && data[0].id,
			algorithm: 'PERSON'
		}
	});

	return (
		<Form form={form} onSubmit={(data) => mutateAsync(data)}>
			<Select name="forwardTo" label="Forward to" css={{ marginTop: '1rem' }}>
				{data?.map(({ id, email }) => (
					<SelectItem key={id} value={id}>
						{email}
					</SelectItem>
				))}
			</Select>

			<Select name="algorithm" label="Algorithm" css={{ marginTop: '1rem' }}>
				{ALGORITHMS.map((algorithm) => (
					<SelectItem key={algorithm} value={algorithm}>
						{capitalize(algorithm)}
					</SelectItem>
				))}
			</Select>

			<Input
				name="name"
				label="Name (optional)"
				placeholder="Enter a name for this mask..."
				css={{ marginTop: '1rem' }}
			/>

			<DialogButtonGroup role="group">
				<DialogCloseButton>Cancel</DialogCloseButton>
				<SubmitButton allowDisable={false}>Add mask</SubmitButton>
			</DialogButtonGroup>
		</Form>
	);
}

function NewMaskDialogContent() {
	return (
		<DialogContent>
			<DialogHeader title="New mask" />

			{/* TODO: Suspense design: */}
			<Suspense fallback={<p>Loading form...</p>}>
				<NewMaskDialogForm />
			</Suspense>
		</DialogContent>
	);
}

export function NewMaskDialog({ trigger }: { trigger: ReactNode }) {
	const dialog = useDialog();

	return (
		<Dialog dialog={dialog}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>

			{dialog.open && <NewMaskDialogContent />}
		</Dialog>
	);
}
