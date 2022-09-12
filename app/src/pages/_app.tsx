import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { withTRPC } from '@trpc/next';
import { MotionConfig } from 'framer-motion';
import { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import superjson from 'superjson';
import { ErrorFallback } from '../components/ErrorFallback';
import { Loading } from '../components/Loading';
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

const SessionProvider = dynamic(() => import('../hooks/use-session'), {
	ssr: false
});

function App({ Component, pageProps }: AppPropsWithComponentLayout) {
	useGlobalStyles();

	const Layout = layouts[Component.layout || 'app'];

	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
					<Suspense fallback={<Loading />}>
						<MotionConfig reducedMotion="user">
							{Component.layout === 'landing' ? (
								<Layout>
									<Component {...pageProps} />
								</Layout>
							) : (
								<SessionProvider>
									<Layout>
										<Component {...pageProps} />
									</Layout>
								</SessionProvider>
							)}
						</MotionConfig>
					</Suspense>
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
