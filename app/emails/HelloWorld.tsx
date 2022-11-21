import {
	Mjml,
	MjmlBody,
	MjmlButton,
	MjmlColumn,
	MjmlHead,
	MjmlImage,
	MjmlPreview,
	MjmlSection,
	MjmlTitle
} from 'mjml-react';

export default function HelloWorld() {
	return (
		<Mjml>
			<MjmlHead>
				<MjmlTitle>Last Minute Offer</MjmlTitle>
				<MjmlPreview>Last Minute Offer...</MjmlPreview>
			</MjmlHead>
			<MjmlBody width={500}>
				<MjmlSection fullWidth backgroundColor="#efefef">
					<MjmlColumn>
						<MjmlImage src="https://static.wixstatic.com/media/5cb24728abef45dabebe7edc1d97ddd2.jpg" />
					</MjmlColumn>
				</MjmlSection>
				<MjmlSection>
					<MjmlColumn>
						<MjmlButton
							padding="20px"
							backgroundColor="#346DB7"
							href="https://www.wix.com/"
						>
							I like it!
						</MjmlButton>
					</MjmlColumn>
				</MjmlSection>
			</MjmlBody>
		</Mjml>
	);
}
