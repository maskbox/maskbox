import { ReactNode } from 'react';
import { trpc } from '../utils/trpc';

export function useSession() {
	return trpc.useContext().getQueryData(['auth.getSession']);
}

export default function SessionProvider({ children }: { children: ReactNode }) {
	trpc.useQuery(['auth.getSession'], {
		suspense: true
	});

	return <>{children}</>;
}
