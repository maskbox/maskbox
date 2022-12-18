import { Inter } from '@next/font/google';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';
import { NextComponentType } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../components/ErrorFallback';
import { useGlobalStyles } from '../hooks/use-global-styles';
import { trpc } from '../utils/trpc';

interface AppPropsWithComponentLayout extends AppProps {
	Component: NextComponentType & { layout: keyof typeof layouts };
}

const inter = Inter();

const layouts = {
	auth: dynamic(() => import('../layouts/AuthLayout'), { ssr: false }),
	app: dynamic(() => import('../layouts/AppLayout'), { ssr: false }),
	landing: dynamic(() => import('../layouts/LandingLayout')),
};

function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppPropsWithComponentLayout) {
	useGlobalStyles();

	const Layout = layouts[Component.layout || 'app'];

	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
					<MotionConfig reducedMotion="user">
						<SessionProvider session={session}>
							<style jsx global>{`
								:root {
									--font-inter: ${inter.style.fontFamily};
								}
							`}</style>

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

export default trpc.withTRPC(App);
