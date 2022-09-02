import { ComponentProps } from 'react';
import { useFormState } from 'react-hook-form';
import { Button } from '../Button';

export function SubmitButton(props: ComponentProps<typeof Button>) {
	const { isDirty } = useFormState();

	return <Button {...props} type="submit" disabled={!isDirty} />;
}
