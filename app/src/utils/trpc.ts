import { createReactQueryHooks } from '@trpc/react';
import type { inferProcedureOutput } from '@trpc/server';
import { AppRouter } from '../server/routers';

type TQuery = keyof AppRouter['_def']['queries'];

export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
	AppRouter['_def']['queries'][TRouteKey]
>;

export const trpc = createReactQueryHooks<AppRouter>();
