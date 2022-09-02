import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { withTRPC } from '@trpc/next';
import type { AppProps } from 'next/app';
import superjson from 'superjson';
import { useGlobalStyles } from '../hooks/use-global-styles';
import type { AppRouter } from '../server/routers';
import { styled } from '../utils/stitches';

// NOTE: We don't want to use SSR, so relative URL is fine.
// See: https://trpc.io/docs/ssr
const TRPC_API_URL = '/api/trpc';

const StyledMain = styled('main', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '100vh'
});

function App({ Component, pageProps }: AppProps) {
	useGlobalStyles();

	return (
		<StyledMain>
			<Component {...pageProps} />
		</StyledMain>
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
						refetchOnWindowFocus: false
					}
				}
			}
		};
	},
	ssr: false
})(App);
