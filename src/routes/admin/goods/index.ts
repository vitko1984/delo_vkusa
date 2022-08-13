import { api } from '../../_db-api';

// GET /goods.json
export const GET: import('@sveltejs/kit').RequestHandler = async ({locals}) => {
  console.log('*serverAdminGetProducts*');	
  // пользователь должен установить файл cookie
  if (!locals.userid) {
	return { 
	  body: {
		status: 401,
		msg: 'Файл cookie не установлен.'
	  }
	};
  };

  try {
	const reqObj = {select: {name: true, categories: {select: {name: true, products: {select: {name: true, photo: true, price: true, description: true}}}}}, };
	const products = await api('tag', 'get_many', reqObj);
	console.log('getProducts: ', products.body);
	if (!products.body) {
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
	};
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

// POST /goods.json
export const POST: import('@sveltejs/kit').RequestHandler = async ({request, locals}) => {
  // пользователь должен установить файл cookie
  if (!locals.userid) {
    return { 
      status: 401,
      msg: 'Файл cookie не установлен.',
      redirect: '/',
    };
  };

  const req_data = await request.json();
  //const task = {uid: locals.userid};

  try {
    console.log('*serverAdminLoad*');
    let load: object[] = [];
    let createCtg: {name: string; products: {create: {name: string; price: string; photo: string; description?: string;}[]}}[] = [];
    let ctgName = '';
    let prod: {name: string; price: string; photo: string; description?: string}[] = [];
    for (const t of req_data) {
      createCtg = [];
      for (const c of t.categories) {
        ctgName = c.name;
        prod = c.products;
        createCtg.push({name: ctgName, products: {create: prod}});
      };

      const reqObj = {where: {name: t.name}, create: {name: t.name, categories: {create: createCtg}}, update: {categories: {upsert: {where: {name: ctgName}, create: {name: ctgName, products: {create: prod}}, update: {products: {create: prod}}}}}, select: {name: true, categories: {select: {name: true, products: {select: {name: true, photo: true, price: true, description: true}}}}}};
      load = [...load, await api('tag', 'upsert', reqObj)];
    };
    if (load.length !== 0) {
      return {
        body: {
          tbl: load,
          status: 200,
          msg: 'Товары успешно внесены в БД.',
        }
      };
    };
  }
  catch(e) {
    console.log('Ошибка БД: ', e.name);
    console.log('Сообщение об ошибке: ', e.message);
  };
};

// DELETE /goods/:uid.json
export const DELETE: import('@sveltejs/kit').RequestHandler = async () => {	
  try {
	  console.log('*ServerClearTable*');
	  const reqObj = {};
	  //const deleteProducts = await api('product', 'delete_many', reqObj);
    //const deleteCategories = await api('category', 'delete_many', reqObj);
    //const deleteTags =await api('tag', 'delete_many', reqObj);
    const deletePosts =await api('post', 'delete_many', reqObj);
    const deleteBasket =await api('basket', 'delete_many', reqObj);
    const deleteUsers =await api('user', 'delete_many', reqObj);

    if (/*deleteProducts && deleteCategories && deleteTags && deleteBasket && deletePosts && */deleteUsers) {
      return {
        body: {
          status: 200,
          msg: 'Таблица успешно очищена из БД.',
        }
      };
    };
  } catch(e) {
	  console.log('Ошибка БД: ', e.name);
	  console.log('Сообщение об ошибке: ', e.message);	  
  };
};