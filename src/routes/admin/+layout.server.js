// @ts-nocheck
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals, url }) {
    const isLoginPage = url.pathname.indexOf(import.meta.env.VITE_LOGIN_PATH) >= 0

	if (!locals.user && !isLoginPage) {
		throw redirect(302, import.meta.env.VITE_LOGIN_PATH);
	} else if (locals.user && isLoginPage) {
      throw redirect(302, '/');
    }

	return {
		user: locals.user,
	};
}
