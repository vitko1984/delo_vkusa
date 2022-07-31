import { api } from '../../_db-api';
import type { Edit } from '$lib/types';

interface DataPost  extends Edit {
  create?: object[];
  categories?: object[];
  tags?: object[];
  content?: object[];
  envelope?: Edit[];
};

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

  /*if (params.slug === 'get_ratings') {
		console.log('*server_GetRatings*'); 
		try {
			const reqObj = {select: {productName: true, rating: true, comment: true, updatedAt: true, userId: true}, };
			const ratings = await api('post', 'get_many', reqObj);
			//console.log('getRatings: ', ratings.body);
			if (!ratings) {
			  return { 
				status: 204,
				msg: 'Ничего не найдено.' 
			  };
			} else {
				return {
				  status: 200,
				  body: ratings.body,
				  msg: 'Выборка рейтингов предоставлена.'
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
	};*/

  if (params.slug === 'get_users') {
		console.log('*server_GetUsers*', locals.userid); 
		try {
			const reqObj = {select: {id: true, uid: true, name: true, email: true, phone: true, address: true, posts: {select: {productName: true, rating: true, comment: true, updatedAt: true, userId: true}, }, basket: true,  profile: true}};
			const users = await api('user', 'get_many', reqObj);
			//console.log('getUsers: ', users.body);
			if (!users) {
			  return { 
				status: 204,
				msg: 'Ничего не найдено.' 
			  };
			} else {
			  return {			  
				  body: {
	  	  	  users: users.body,
				    uid: locals.userid,
		  		  status: 200,
		  		  msg: 'Пользователи успешно извлечены из БД.',
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
};

export const POST: import('@sveltejs/kit').RequestHandler = async ({request, params, locals}) => {
  // пользователь должен установить файл cookie
  if (!locals.userid) {  
    return { 
      body: {
      status: 401,
        msg: 'Файл cookie не установлен.'
      }
    };
    };
  
    const req_data: DataPost = await request.json();
    const task = {uid: locals.userid};

  if (params.slug === 'dialog') {
    try {
      console.log('ServerDialog: ', req_data);
      const postsData = {create: [{rating: req_data.rating, comment: req_data.comment, productName: `${req_data.productName}|${locals.userid}`, }, ], };
      const reqObj = {where: task, create: {name: req_data.name, uid: locals.userid, posts: postsData, }, update: {name: req_data.name, posts: postsData, }, select: {posts: {select: {productName: true, rating: true, comment: true}}}};
      const user = await api('user', 'upsert', reqObj);
      return {
      body: {
          ...user,
        status: 200,
        msg: 'Отзыв и рейтинг успешно внесены в БД.',
      }
      };
    }
    catch(e) {
      console.log('Ошибка БД: ', e.name);
      console.log('Сообщение об ошибке: ', e.message);
    }; 	
  };

  if (params.slug === 'basket') {
    try {
      console.log('ServerBasket: ', req_data);
      const basket = await api('basket', 'get', {where: {productName: `${req_data.productName}|${locals.userid}`}});
      console.log('ServerBasketBody: ', basket.body);
      const reqObj = {where: task, data: {basket: {upsert: {where: {productName: `${req_data.productName}|${locals.userid}`}, create: {price: Number(req_data.price), amount: req_data.amount, productName: `${req_data.productName}|${locals.userid}`, },  
      update: {price: Number(req_data.price), amount: basket.body ? req_data.amount + basket.body.amount : req_data.amount, }}}}, select: {uid: true, basket: {select: {productName: true, price: true, amount: true}}}};
      const user: EndpOutp = await api('user', 'update', reqObj);
      if (!user) {
      return {
        status: 204,
        msg: 'Что-то пошло не так...' 
      };
      } else {
      return {
        body: {
            ...user,
          status: 200,
          msg: 'Позиция корзины успешно внесена в БД.',
        }
        };
      };
      } catch(e) {
      console.log('Ошибка БД: ', e.name);
      console.log('Сообщение об ошибке: ', e.message);
    }; 	
    };
};
