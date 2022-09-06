import { createContext, ReactNode, useContext } from 'react';
import { InferQueryOutput, trpc } from '../utils/trpc';

const SessionContext = createContext<{
	session?: InferQueryOutput<'user.getMe'>;
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
}>({
	isLoading: true,
	isSuccess: false,
	isError: false
});

export const useSession = () => useContext(SessionContext);

export function SessionProvider({ children }: { children: ReactNode }) {
	const { data, isLoading, isSuccess, isError } = trpc.useQuery(
		['user.getMe'],
		{
			useErrorBoundary: false
		}
	);

	return (
		<SessionContext.Provider
			value={{ session: data, isLoading, isSuccess, isError }}
		>
			{children}
		</SessionContext.Provider>
	);
}
