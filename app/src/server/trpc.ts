import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import type { Context } from './context';

const t = initTRPC.context<Context>().create({
	transformer: superjson,
	errorFormatter({ shape }) {
		return shape;
	},
});

const isAuthorized = t.middleware(({ ctx, next }) => {
	if (!ctx.session || !ctx.session.user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({
		ctx: {
			...ctx,
			// NOTE: Infers that `session` is non-nullable:
			session: { ...ctx.session, user: ctx.session.user },
		},
	});
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthorized);
