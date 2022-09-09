import superjson from 'superjson';
import { createRouter } from '../create-router';
import { authRouter } from './auth';
import { emailRouter } from './email';
import { maskRouter } from './mask';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('auth.', authRouter)
	.merge('email.', emailRouter)
	.merge('mask.', maskRouter);

export type AppRouter = typeof appRouter;
