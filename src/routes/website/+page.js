	//export const prerender = true
/** @type {import('./$types').PageLoad} */
export const load = async ({ parent }) => {
  const { usr } = await parent();
  return {
    userid: usr.uid,
  };
};
