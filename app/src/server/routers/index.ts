import superjson from 'superjson';
import { createRouter } from '../create-router';
import { helloRouter } from './example';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('example.', helloRouter);

export type AppRouter = typeof appRouter;
