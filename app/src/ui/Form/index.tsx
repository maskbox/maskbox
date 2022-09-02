import { zodResolver } from '@hookform/resolvers/zod';
import { ComponentProps } from 'react';
import {
	FormProvider,
	SubmitHandler,
	useForm,
	UseFormProps,
	UseFormReturn
} from 'react-hook-form';
import { z } from 'zod';
import { styled } from '../../utils/stitches';

export type InferFormDataType<Form extends UseFormReturn> = Parameters<
	Parameters<Form['handleSubmit']>[0]
>[0];

const StyledForm = styled('form', {
	width: '100%'
});

export function useZodForm<
	Schema extends z.Schema,
	FieldValues extends z.infer<Schema>
>({
	schema,
	...props
}: {
	schema: Schema;
} & UseFormProps<FieldValues>) {
	const form = useForm<FieldValues>({
		...props,
		resolver: zodResolver(schema)
	});

	return form;
}

export function Form<Form extends UseFormReturn<any>>({
	form,
	onSubmit,
	...props
}: {
	form: Form;
	onSubmit: SubmitHandler<InferFormDataType<Form>>;
} & Omit<ComponentProps<typeof StyledForm>, 'onSubmit'>) {
	return (
		<FormProvider {...form}>
			<StyledForm {...props} onSubmit={form.handleSubmit(onSubmit)} />
		</FormProvider>
	);
}
