import superjson from 'superjson';
import { createRouter } from '../create-router';
import { emailRouter } from './email';
import { maskRouter } from './mask';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('email.', emailRouter)
	.merge('mask.', maskRouter);

export type AppRouter = typeof appRouter;
