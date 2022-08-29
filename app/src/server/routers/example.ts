import { createRouter } from '../create-router';

export const helloRouter = createRouter().query('hello', {
	resolve() {
		return {
			message: 'Hello world!'
		};
	}
});
