import { zodResolver } from '@hookform/resolvers/zod';
import { ComponentProps } from 'react';
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useForm,
	UseFormProps,
	UseFormReturn
} from 'react-hook-form';
import { z } from 'zod';
import { styled } from '../../utils/stitches';

interface Props<T extends FieldValues>
	extends Omit<ComponentProps<typeof StyledForm>, 'onSubmit'> {
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
}

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

export function Form<T extends FieldValues>({
	form,
	onSubmit,
	...props
}: Props<T>) {
	return (
		<FormProvider {...form}>
			<StyledForm {...props} onSubmit={form.handleSubmit(onSubmit)} />
		</FormProvider>
	);
}
