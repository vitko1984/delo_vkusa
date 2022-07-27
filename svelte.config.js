import adapter from '@sveltejs/adapter-auto';
import preprocess from "svelte-preprocess";

let routeFolder = process.env.ROUTE_FOLDER

if (routeFolder == undefined) {
  routeFolder = 'website';
  //routeFolder = '';
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
	adapter: adapter(),

	// Override http methods in the Todo forms
	methodOverride: {
	  allowed: ['PUT', 'PATCH', 'DELETE']
	},

	files: {
	  routes: `src/routes/${routeFolder}`,
	  hooks: `src/hooks/cookie-hooks.ts`,
	},
  },
  preprocess: [
	preprocess({
	  postcss: true,
	}),
  ],
};

export default config;
