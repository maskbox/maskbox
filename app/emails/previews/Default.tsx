import Default from '../Default';

export function MagicLink() {
	return (
		<Default
			title="Sign in to Maskbox"
			body={
				<>
					We have received a sign in attempt to Maskbox. If this was you, please
					click the button below to complete the process. This link will only be
					valid for the next <strong>10 minutes</strong>.
				</>
			}
			buttonText="Sign in to Maskbox"
			buttonHref="#"
		/>
	);
}

export function EmailVerification() {
	return (
		<Default
			title="Email address verification"
			body={
				<>
					Please click the button below to verify your newly added email address{' '}
					<strong>john.doe@domain.com</strong>.
				</>
			}
			buttonText="Verify email address"
			buttonHref="#"
		/>
	);
}
