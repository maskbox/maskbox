import superjson from 'superjson';
import { createRouter } from '../create-router';
import { authRouter } from './auth';
import { emailRouter } from './email';
import { userRouter } from './user';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('auth.', authRouter)
	.merge('user.', userRouter)
	.merge('email.', emailRouter);

export type AppRouter = typeof appRouter;
