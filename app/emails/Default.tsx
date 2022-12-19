import {
	Mjml,
	MjmlAll,
	MjmlAttributes,
	MjmlBody,
	MjmlButton,
	MjmlColumn,
	MjmlDivider,
	MjmlFont,
	MjmlHead,
	MjmlImage,
	MjmlSection,
	MjmlSpacer,
	MjmlStyle,
	MjmlText,
} from 'mjml-react';
import { ReactNode } from 'react';

// Colors
export const gray1 = '#171717';
export const gray2 = '#FCFCFC';
export const gray3 = '#E2E2E2';
export const gray4 = '#6F6F6F';

// Typography
export const textSm = 14;
export const textBase = 16;
export const textLg = 24;
export const fontMedium = 500;
export const fontSemiBold = 600;
export const leadingTight = '120%';
export const leadingRelaxed = '160%';

// Borders
export const borderBase = 12;

export default function Default({
	title,
	body,
	buttonText,
	buttonHref,
}: {
	title: string;
	body: ReactNode;
	buttonText: string;
	buttonHref: string;
}) {
	return (
		<Mjml>
			<MjmlHead>
				<MjmlStyle>{`
				strong {
					font-weight: 600;
				}
        .smooth {
          -webkit-font-smoothing: antialiased;
        }
      `}</MjmlStyle>
				<MjmlFont
					name="Inter"
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600"
				/>
				<MjmlAttributes>
					<MjmlAll
						font-family='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
						font-weight="400"
					/>
				</MjmlAttributes>
			</MjmlHead>

			<MjmlBody width={500}>
				<MjmlSection padding="32px 24px 0">
					<MjmlColumn>
						<MjmlImage
							padding="0"
							width="80px"
							height="80px"
							align="left"
							src="https://maskbox.app/logo.png"
						/>
					</MjmlColumn>
				</MjmlSection>

				<MjmlSection cssClass="smooth" padding="0 24px">
					<MjmlColumn>
						<MjmlText
							padding="20px 0"
							fontSize={textLg}
							fontWeight={fontMedium}
							lineHeight={leadingTight}
							color={gray1}
							cssClass="paragraph"
						>
							{title}
						</MjmlText>

						<MjmlSpacer height="16px" />

						<MjmlText
							cssClass="paragraph"
							padding="0"
							fontSize={textBase}
							lineHeight={leadingRelaxed}
							color={gray1}
						>
							{body}
						</MjmlText>

						<MjmlSpacer height="24px" />

						<MjmlButton
							height={48}
							padding="0"
							align="left"
							fontSize={textBase}
							fontWeight={fontSemiBold}
							lineHeight={leadingTight}
							backgroundColor={gray1}
							color={gray2}
							borderRadius={borderBase}
							href={buttonHref}
						>
							{buttonText}
						</MjmlButton>

						<MjmlDivider
							padding="32px 0 0"
							borderWidth="1px"
							borderColor={gray3}
						/>
					</MjmlColumn>
				</MjmlSection>

				<MjmlSection cssClass="smooth" padding="0 24px 32px">
					<MjmlColumn>
						<MjmlText
							cssClass="footer"
							padding="16px 0 0"
							fontSize={textSm}
							color={gray4}
						>
							Maskbox
						</MjmlText>
					</MjmlColumn>
				</MjmlSection>
			</MjmlBody>
		</Mjml>
	);
}
