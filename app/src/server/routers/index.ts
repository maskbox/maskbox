import superjson from 'superjson';
import { createRouter } from '../create-router';
import { authRouter } from './auth';
import { userRouter } from './user';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('auth.', authRouter)
	.merge('user.', userRouter);

export type AppRouter = typeof appRouter;
