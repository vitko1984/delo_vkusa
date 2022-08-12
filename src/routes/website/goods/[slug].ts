import { api } from '../../_db-api';
//import tg_api  from '../../_telegram-api';
import type { Edit, EndpOutp } from '$lib/types';
//import nodemailer from 'nodemailer';

//const yandexUser = import.meta.env.VITE_MAIL_USERNAME;
//const yandexPass = import.meta.env.VITE_MAIL_PASSWORD;
//const googleUser = import.meta.env.VITE_GOOGLE_MAIL_USERNAME;
//const googlePass = import.meta.env.VITE_GOOGLE_MAIL_PASSWORD;

interface DataPost  extends Edit {
  create?: object[];
  categories?: object[];
  tags?: object[];
  content?: object[];
  envelope?: Edit[];
};

//let testEmailAccount = nodemailer.createTestAccount()
/*const transporter = nodemailer.createTransport({
	//pool: true,
	//service: 'gmail',
	service: 'yandex',
	//host: "smtp.ethereal.email",
	port: 465,
	secure: true, // use TLS
	auth: {
	  //user: googleUser,
	  user: yandexUser,
	  //user: testEmailAccount.user,
	  //pass: googlePass,
	  pass: yandexPass,
	  //pass: testEmailAccount.pass,
	},
});*/

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

  if (params.slug === 'get_users') {
		console.log('*server_GetUsers*', locals.userid); 
		try {
			const reqObj = {select: {id: true, uid: true, name: true, email: true, phone: true, address: true, avatar: true, posts: {select: {productName: true, rating: true, comment: true, updatedAt: true, userId: true}, }, basket: true,  profile: true}};
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
      const basketData = {price: req_data.price, amount: req_data.amount, productName: `${req_data.productName}|${locals.userid}`};
      const basket = await api('basket', 'get', {where: {productName: `${req_data.productName}|${locals.userid}`}});
      console.log('ServerBasketBody: ', basket.body);
      const reqObj = {where: task, create: {uid: locals.userid, basket: {create: basketData}}, update: {basket: {upsert: {where: {productName: `${req_data.productName}|${locals.userid}`}, create: basketData,  
      update: {price: req_data.price, amount: basket.body ? req_data.amount + basket.body.amount : req_data.amount, }}}}, select: {uid: true, basket: {select: {productName: true, price: true, amount: true}}}};
      const user:EndpOutp = await api('user', 'upsert', reqObj);
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

  if (params.slug === 'user') {
    try {
      console.log('*ServerUser: *', req_data);
      //let mail_success = false;
      if (req_data.title === 'Заказ' || req_data.title === 'Перезвонить' || req_data.title === 'Комментарий "Контакты"') {
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
  
        /*const mailOptions = {
          from: "delo-vkusa22@yandex.ru",
          to: "nk1389074@gmail.com",
          subject: req_data.title,
          html: html,
          dsn: {
            id: '#####',
            return: 'full',
            notify: 'success',
            recipient: `${req_data.email}`
          },	
        };*/
        // verify connection configuration
        /*transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("*Почтовый сервер готов принимать ваши сообщения*");
        };
          });*/

        /*transporter.sendMail(mailOptions, err => {
          if (err) {
            console.log('*Почтовое сообщение не удалось отправить.*');
            return;
          };
          console.log('*Почтовое сообщение отправлено.*');
        });*/

        try {
          const Token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN, chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
          const url = `https://api.telegram.org/bot${Token}/sendMessage?chat_id=${chatId}&text=${html}&parse_mode=HTML`;
          //const url = 'https://delo-vkusa.vercel.app/api/bot'
          //const res = await fetch(url, {method: 'post', body: JSON.stringify({msg: html}), headers: {accept: 'application/json'}, credentials: 'include'});
          const res = await fetch(url);
          const result = res.ok && await res.json();
          return  {
            body: {
              content: result,
              status: 200,
              msg: '*Сообщение отправлено.*',
            },  
          };
        } catch(e) {
          console.error(e);
          return null;
        };
      };
      
      const reqObj = {where: task, create: {name: req_data.name, uid: locals.userid, email: req_data.email, phone: req_data.phone, address: req_data.address, }, update: {name: req_data.name, email: req_data.email, phone: req_data.phone, address: req_data.address, }, select: {uid: true}};
      const user = await api('user', 'upsert', reqObj);
      return {
      body: {
          ...user,
        status: 200,
        msg: 'Данные пользователя успешно внесены в БД.',
      }
      };
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
	  return {
	  	body: {
	  	  ...user,
		  status: 200,
		  msg: 'Позиция корзины успешно удалена из БД.',
	  	}
	  };
  	} catch(e) {
	  console.log('Ошибка БД: ', e.name);
	  console.log('Сообщение об ошибке: ', e.message);	  
  	};
  };
};
