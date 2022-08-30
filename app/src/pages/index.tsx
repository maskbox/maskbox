import { trpc } from '../utils/trpc';

export default function Home() {
	const hello = trpc.useQuery(['example.hello']);

	return <h1>{hello.data ? hello.data.message : 'Loading...'}</h1>;
}
