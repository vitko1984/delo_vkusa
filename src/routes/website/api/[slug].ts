import { api } from '../../_db-api';

// GET /goods.json
export const GET: import('@sveltejs/kit').RequestHandler = async ({params, locals}) => {
  // пользователь должен установить файл cookie
  if (!locals.userid) {
	return { 
	  body: {
		status: 401,
		msg: 'Файл cookie не установлен.'
	  }
	};
  };

  if (params.slug === 'get_products') {
	console.log('*server_GetProducts*');
    try {
      const reqObj = {select: {name: true, categories: {select: {name: true, products: {select: {name: true, photo: true, price: true, description: true}}}}}, };
      const products = await api('tag', 'get_many', reqObj);
      console.log('getProducts: ', products.body);
      /*if (!products.body) {
        return { 
          status: 204,
          msg: 'Ничего не найдено.' 
        };
      } else {
        return {
          body: {
            tbl: products.body,
            status: 200,
            msg: 'Товары успешно извлечены из БД.',
          }
        };
      };*/
    } catch(e) {
      console.log('Ошибка БД: ', e.name);
      console.log('Сообщение об ошибке: ', e.message);
      return {
        body: {
          status: 401,
          msg: e.message
        }
      };		  
    };
  };
};
