import superjson from 'superjson';
import { createRouter } from '../create-router';
import { authRouter } from './auth';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('auth.', authRouter);

export type AppRouter = typeof appRouter;
