import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from '../server/routers';

export const trpc = createReactQueryHooks<AppRouter>();
