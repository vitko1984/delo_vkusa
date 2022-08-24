// @ts-nocheck
/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
  const products = await fetch('/goods');
  return {
    get_prd: products.ok && (await products.json()),
  };
};
