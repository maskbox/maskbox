import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import sendMail from '../../../../emails';
import Default from '../../../../emails/Default';
import { SIGN_IN_CODE_MAX_AGE } from '../../../constants';
import { prisma } from '../../../utils/prisma';
import { emailStringSchemaWithDisposableEmailCheck } from '../../../utils/schema';

export const authOptions: NextAuthOptions = {
	providers: [
		EmailProvider({
			maxAge: SIGN_IN_CODE_MAX_AGE,
			sendVerificationRequest({ identifier, url }) {
				sendMail({
					to: identifier,
					subject: 'Sign in to Maskbox',
					component: (
						<Default
							title="Sign in to Maskbox"
							body={
								<>
									We have received a sign in attempt to Maskbox. If this was
									you, please click the button below to complete the process.
									This link will only be valid for the next{' '}
									<strong>10 minutes</strong>.
								</>
							}
							buttonText="Sign in to Maskbox"
							buttonHref={url}
						/>
					),
				});
			},
		}),
	],
	pages: {
		signIn: '/sign-in',
	},
	adapter: PrismaAdapter(prisma),
	callbacks: {
		// Include user's ID on session:
		session({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
			}

			return session;
		},
		async signIn({ user }) {
			const { success } =
				await emailStringSchemaWithDisposableEmailCheck.safeParseAsync(
					user.email
				);

			return success;
		},
	},
	events: {
		async createUser({ user }) {
			if (!user.email) {
				return;
			}

			await prisma.email.create({
				data: {
					email: user.email,
					verifiedAt: new Date(),
					userId: user.id,
				},
			});
		},
	},
};

export default NextAuth(authOptions);
