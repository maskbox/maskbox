import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { withTRPC } from '@trpc/next';
import { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import superjson from 'superjson';
import { AppLayout, AuthLayout } from '../components/Layout';
import { useGlobalStyles } from '../hooks/use-global-styles';
import type { AppRouter } from '../server/routers';

interface AppPropsWithComponentLayout extends AppProps {
	Component: NextComponentType & { layout: keyof typeof layouts };
}

// NOTE: We don't want to use SSR, so relative URL is fine.
// See: https://trpc.io/docs/ssr
const TRPC_API_URL = '/api/trpc';

const layouts = {
	auth: AuthLayout,
	app: AppLayout
};

function App({ Component, pageProps }: AppPropsWithComponentLayout) {
	useGlobalStyles();

	const Layout = layouts[Component.layout || 'app'];

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
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
						refetchOnWindowFocus: false,
						retry: false
					}
				}
			}
		};
	},
	ssr: false
})(App);
