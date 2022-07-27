import * as cookie from 'cookie';
import type { Handle, GetSession } from '@sveltejs/kit';
import my_photo from '$lib/pictures/my_photo.jpg';

// функция - дескриптор, выполняется только на сервере
// и перехватывает каждый запрос на сервер
// (и во время предварительного рендеринга)
export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');
  console.log('Descriptor Hooks CookiesUserId: ', cookies['userid']);
	event.locals.userid = cookies['userid'] || crypto.randomUUID();


  if (!event.locals.user) {
    event.locals.user = {
      id: 1,
      email: "knnaksay@gmail.com",
      photo: my_photo,
      //photo: '',
      first_name: "Николай",
      last_name: "Коваленко",
    };
  };

  // до вызова функции разрешения(resolve) код происходит до вызова конечной точки или страницы
  const response = await resolve(event);
  // здесь(после вызова функции разрешения - resolve) код выполняется после вызова конечной точки или страницы

  if ( !cookies['userid'] ) {
	// когда пользователь первый раз  посещает это приложение,
    response.headers.set(
	  'set-cookie',
	  cookie.serialize('userid', event.locals.userid, {
		path: '/',
		httpOnly: true,
        maxAge: 1000*60*60*24*30,
	  })
	);
  }

  return response;
};
  
export const getSession: GetSession = (event) => {
  const { message, userid, user } = event.locals;
  console.log('hooks_getSessionEventLocals: ', event.locals);
  return { message: message, userid: userid, user: user };
};