import { Inter } from '@next/font/google';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';
import { NextComponentType } from 'next';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../components/ErrorFallback';
import { useGlobalStyles } from '../hooks/use-global-styles';
import { trpc } from '../utils/trpc';

interface AppPropsWithComponentLayout extends AppProps {
	Component: NextComponentType & { layout: keyof typeof layouts };
}

const BASE_URL = 'https://maskbox.app';

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

	const { asPath } = useRouter();
	const url = `${BASE_URL}${asPath}`;

	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
					<MotionConfig reducedMotion="user">
						<SessionProvider session={session}>
							<DefaultSeo
								titleTemplate="%s – Maskbox"
								description="Maskbox protects your real email addresses from internet strangers and automatically forwards messages to your inbox."
								canonical={url}
								additionalMetaTags={[
									{
										name: 'viewport',
										content: 'width=device-width, initial-scale=1.0',
									},
									{
										name: 'url',
										content: url,
									},
								]}
								additionalLinkTags={[
									{
										rel: 'shortcut icon',
										href: '/favicon.ico',
										type: 'image/x-icon',
									},
								]}
								openGraph={{
									type: 'website',
									site_name: 'maskbox.app',
									images: [{ url: `${BASE_URL}/og.png` }],
								}}
							/>

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
