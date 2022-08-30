import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { withTRPC } from '@trpc/next';
import type { AppProps } from 'next/app';
import superjson from 'superjson';
import type { AppRouter } from '../server/routers';
import { globalCss } from '../utils/stitches';

// NOTE: We don't want to use SSR, so relative URL is fine.
// See: https://trpc.io/docs/ssr
const TRPC_API_URL = '/api/trpc';

const useGlobalStyles = globalCss({
	'*': {
		boxSizing: 'border-box'
	},
	html: {
		colorScheme: 'dark',
		fontFamily: '$sans',
		WebkitFontSmoothing: 'antialiased',
		MozOsxFontSmoothing: 'grayscale',
		WebkitTextSizeAdjust: '100%'
	},
	body: {
		margin: 0,
		background: '$gray1',
		color: '$gray12'
	},
	'h1, h2, h3, h4, h5, h6': {
		margin: 0
	}
});

function App({ Component, pageProps }: AppProps) {
	useGlobalStyles();

	return <Component {...pageProps} />;
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
