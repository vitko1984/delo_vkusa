/** @type {import('./$types').LayoutLoad} */
export const load = async ({ fetch }) => {
  const products = await fetch('/goods/get_products');
  const users = await fetch('/goods/get_users');
  return {
    usr: users.ok && (await users.json()),
    get_prd: products.ok && (await products.json()),
  };
};
