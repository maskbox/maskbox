import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import superjson from 'superjson';
import type { AppRouter } from '../server/routers';

// NOTE: We don't want to use SSR, so relative URL is fine.
// See: https://trpc.io/docs/ssr
const TRPC_API_URL = '/api/trpc';

export const trpc = createTRPCNext<AppRouter>({
	config() {
		return {
			url: TRPC_API_URL,
			transformer: superjson,
			links: [httpBatchLink({ url: TRPC_API_URL })],
			queryClientConfig: {
				defaultOptions: {
					queries: {
						useErrorBoundary: true,
						refetchOnWindowFocus: false,
						retry: false,
					},
					mutations: {
						retry: false,
					},
				},
			},
		};
	},
	ssr: false,
});

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
