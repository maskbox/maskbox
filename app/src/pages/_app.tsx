import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { withTRPC } from '@trpc/next';
import { MotionConfig } from 'framer-motion';
import { NextComponentType } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import superjson from 'superjson';
import { ErrorFallback } from '../components/ErrorFallback';
import { useGlobalStyles } from '../hooks/use-global-styles';
import type { AppRouter } from '../server/routers';

interface AppPropsWithComponentLayout extends AppProps {
	Component: NextComponentType & { layout: keyof typeof layouts };
}

// NOTE: We don't want to use SSR, so relative URL is fine.
// See: https://trpc.io/docs/ssr
const TRPC_API_URL = '/api/trpc';

const layouts = {
	auth: dynamic(() => import('../layouts/AuthLayout'), { ssr: false }),
	app: dynamic(() => import('../layouts/AppLayout'), { ssr: false }),
	landing: dynamic(() => import('../layouts/LandingLayout'))
};

function App({
	Component,
	pageProps: { session, ...pageProps }
}: AppPropsWithComponentLayout) {
	useGlobalStyles();

	const Layout = layouts[Component.layout || 'app'];

	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
					<MotionConfig reducedMotion="user">
						<SessionProvider session={session}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</SessionProvider>
					</MotionConfig>
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
}

export default withTRPC<AppRouter>({
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
						retry: false
					},
					mutations: {
						retry: false
					}
				}
			}
		};
	},
	ssr: false
})(App);
