import { router } from '../trpc';
import { emailRouter } from './email';
import { maskRouter } from './mask';

export const appRouter = router({
	email: emailRouter,
	mask: maskRouter
});

export type AppRouter = typeof appRouter;
