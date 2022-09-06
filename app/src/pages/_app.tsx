import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { withTRPC } from '@trpc/next';
import { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import superjson from 'superjson';
import { ErrorFallback } from '../components/ErrorFallback';
import { useGlobalStyles } from '../hooks/use-global-styles';
import { SessionProvider } from '../hooks/use-session';
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
	marketing: dynamic(() => import('../layouts/MarketingLayout'))
};

function App({ Component, pageProps }: AppPropsWithComponentLayout) {
	useGlobalStyles();

	const Layout = layouts[Component.layout || 'app'];

	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
					<SessionProvider>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</SessionProvider>
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
