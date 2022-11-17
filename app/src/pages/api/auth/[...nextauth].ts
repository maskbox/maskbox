import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { prisma } from '../../../utils/prisma';

export const authOptions: NextAuthOptions = {
	providers: [
		EmailProvider({
			// TODO:
			sendVerificationRequest({ url }) {
				console.log(url);
			}
		})
	],
	pages: {
		signIn: '/sign-in'
	},
	adapter: PrismaAdapter(prisma),
	callbacks: {
		// Include user's ID on session:
		session({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
			}

			return session;
		}
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
					userId: user.id
				}
			});
		}
	}
};

export default NextAuth(authOptions);
