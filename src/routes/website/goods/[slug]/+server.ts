import { json as json$1 } from '@sveltejs/kit';
import { api } from '../../../_db-api';
import type { Edit, EndpOutp } from '$lib/types';

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
	  return json$1({
	    status: 401,
	    msg: 'Файл cookie не установлен.'
    });
  };

  if (params.slug === 'get_products') {
	console.log('*server_GetProducts*');
    try {
      const reqObj = {select: {name: true, categories: {select: {name: true, products: {select: {name: true, photo: true, price: true, description: true}}}}}, };
      const products = await api('tag', 'get_many', reqObj);
      console.log('getProducts: ', products.body);
      if (!products.body) {
        return new Response(undefined, { status: 204 });
      } else {
        return json$1({
  tbl: products.body,
  status: 200,
  msg: 'Товары успешно извлечены из БД.',
});
      };
    } catch(e) {
      console.log('Ошибка БД: ', e.name);
      console.log('Сообщение об ошибке: ', e.message);
      return json$1({
  status: 401,
  msg: e.message
});		  
    };
  };

  if (params.slug === 'get_users') {
		console.log('*server_GetUsers*', locals.userid); 
		try {
			const reqObj = {select: {id: true, uid: true, name: true, email: true, phone: true, address: true, avatar: true, posts: {select: {productName: true, rating: true, comment: true, updatedAt: true, userId: true}, }, basket: true,  profile: true}};
			const users = await api('user', 'get_many', reqObj);
			//console.log('getUsers: ', users.body);
			if (!users) {
			  return new Response(undefined, { status: 204 });
			} else {
			  return json$1({
  	  	  users: users.body,
			    uid: locals.userid,
	  		  status: 200,
	  		  msg: 'Пользователи успешно извлечены из БД.',
			  });
			};
		} catch(e) {
			console.log('Ошибка БД: ', e.name);
			console.log('Сообщение об ошибке: ', e.message);
			return json$1({
			  status: 401,
			  msg: e.message
		  });		  
		};
	};
};

export const POST: import('@sveltejs/kit').RequestHandler = async ({request, params, locals}) => {
  // пользователь должен установить файл cookie
  if (!locals.userid) {  
    return json$1({
status: 401,
  msg: 'Файл cookie не установлен.'
});
    };
  
    const req_data: DataPost = await request.json();
    const task = {uid: locals.userid};

  if (params.slug === 'dialog') {
    try {
      console.log('ServerDialog: ', req_data);
      const postsData = {create: [{rating: req_data.rating, comment: req_data.comment, productName: `${req_data.productName}|${locals.userid}`, }, ], };
      const reqObj = {where: task, create: {name: req_data.name, uid: locals.userid, posts: postsData, }, update: {name: req_data.name, posts: postsData, }, select: {uid: true, posts: {select: {productName: true, rating: true, comment: true}}}};
      const user = await api('user', 'upsert', reqObj);
      return json$1({
    ...user,
  status: 200,
  msg: 'Отзыв и рейтинг успешно внесены в БД.',
});
    }
    catch(e) {
      console.log('Ошибка БД: ', e.name);
      console.log('Сообщение об ошибке: ', e.message);
    }; 	
  };

  if (params.slug === 'basket') {
    try {
      console.log('ServerBasket: ', req_data);
      const basketData = {price: req_data.price, amount: req_data.amount, productName: `${req_data.productName}|${locals.userid}`};
      const basket = await api('basket', 'get', {where: {productName: `${req_data.productName}|${locals.userid}`}});
      console.log('ServerBasketBody: ', basket.body);
      const reqObj = {where: task, create: {uid: locals.userid, basket: {create: basketData}}, update: {basket: {upsert: {where: {productName: `${req_data.productName}|${locals.userid}`}, create: basketData,  
      update: {price: req_data.price, amount: basket.body ? req_data.amount + basket.body.amount : req_data.amount, }}}}, select: {uid: true, basket: {select: {productName: true, price: true, amount: true}}}};
      const user:EndpOutp = await api('user', 'upsert', reqObj);
      if (!user) {
      return new Response(undefined, { status: 204 });
      } else {
      return json$1({
    ...user,
  status: 200,
  msg: 'Позиция корзины успешно внесена в БД.',
});
      };
      } catch(e) {
      console.log('Ошибка БД: ', e.name);
      console.log('Сообщение об ошибке: ', e.message);
    }; 	
  };

  if (params.slug === 'user') {
    try {
      console.log('*ServerUser: *', req_data);
      let html = '';
      if (req_data.envelope) {
        //if (req_data.title === 'Заказ') { 
        let envlpCntnt = '';
        req_data.envelope.map(v => {
          envlpCntnt += `
            <b>*</b> <u>Продукт:</u> ${(v.productName).replace(`|${locals.userid}`, '')}\n
            <u>Цена:</u> ${v.price}\n
            <u>Количество:</u> ${v.amount} <b>*</b>\n`;
        });
        html = `✅ <b>${req_data.title}</b>
          <u>Заказчик:</u> ${req_data.name} 
          <u>Телефон:</u> ${req_data.phone} 
          <u>Эл.почта:</u> ${req_data.email} 
          <u>Адрес доставки:</u> ${req_data.address}\n 
          <b>Детали заказа:</b>\n
          ${envlpCntnt}
          <b><u>Общая стоимость:</u> <i>${req_data.total}</i></b> 👋🏻`;
      } else if (req_data.title === 'Перезвонить') {
          html = `✅ <b>${req_data.title}</b>
            <ins>Клиент:</ins> ${req_data.name}
            <ins>Телефон:</ins> ${req_data.phone}
            <ins>Вемя звонка, пожелания:</ins> ${req_data.wish} 👋🏻`;	
      } else if (req_data.title === 'Комментарий "Контакты"') {
          html = `✅ <b>${req_data.title}</b>
            <ins>Клиент:</ins> ${req_data.name}
            <ins>Эл.почта:</ins> ${req_data.email}
            <ins>Комментарий, пожелание:</ins> ${req_data.wish} 👋🏻`;
      };
      
      const reqObj = {where: task, create: {name: req_data.name, uid: locals.userid, email: req_data.email, phone: req_data.phone, address: req_data.address, }, update: {name: req_data.name, email: req_data.email, phone: req_data.phone, address: req_data.address, }, select: {uid: true, name: true, email: true, phone: true, address: true, avatar: true,}};
      const user = await api('user', 'upsert', reqObj);
      
      const Token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN, chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
      let tlg;
      
      if (html.length !== 0) {
        const url = `https://api.telegram.org/bot${Token}/sendMessage?chat_id=${chatId}&text=${html}&parse_mode=HTML`;
        const res_tlg = await fetch(url);
        tlg = res_tlg.ok && await res_tlg.json();
      };
      return json$1({
  ...user,
  content: tlg,
  status: 200,
  msg: tlg ? 'Сообщение отправлено, данные пользователя внесены в БД.' : 'Данные пользователя успешно внесены в БД.',
});
    }
    catch(e) {
      console.log('Ошибка БД: ', e.name);
      console.log('Сообщение об ошибке: ', e.message);
    }; 	
  };
};

// DELETE /goods/:uid.json
export const DELETE:import('@sveltejs/kit').RequestHandler = async ({request, params, locals}) => {
  const req_data: DataPost = await request.json();
  const task = {uid: locals.userid};
  if (params.slug === 'basket_del') {	
  	try {
	  console.log('*ServerBasketDel*');
	  const reqObj = {where: task, data: {basket: {deleteMany: [{productName: req_data.productName}]}}, select: {basket: {select: {productName: true, price: true, amount: true}}}};
	  const user = await api('user', 'update', reqObj);
	  return json$1({
  	  ...user,
	  status: 200,
	  msg: 'Позиция корзины успешно удалена из БД.',
  	});
  	} catch(e) {
	  console.log('Ошибка БД: ', e.name);
	  console.log('Сообщение об ошибке: ', e.message);	  
  	};
  };
};
