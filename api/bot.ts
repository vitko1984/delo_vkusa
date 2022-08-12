import type { VercelRequest, VercelResponse } from '@vercel/node';
import TelegramBot from 'node-telegram-bot-api';

/*export default function handler(request: VercelRequest, response: VercelResponse) {
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}*/

const handler = async (request: VercelRequest, response: VercelResponse) => {
  try {
    // Создаем новый обработчик бота с токеном
    // что дал нам Botfather
    // Использовать переменную окружения, чтобы не показывать ее в нашем коде
    //const bot = new TelegramBot(token, { polling: true });
    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
    const userId = process.env.TELEGRAM_CHAT_ID;
    // Получаем тело POST-запроса, отправленного из Telegram
    const { body } = request;
    // Убедитесь, что это отправляемое сообщение
    if (body.msg) {
      // Создаем сообщение для отправки обратно
      // Мы можем использовать Markdown внутри этого
      //const message = `✅ Спасибо за ваше сообщение: *"${text}"*\nхорошего дня! 👋🏻`;
      // Отправляем наше новое сообщение обратно в Markdown
      await bot.sendMessage(userId, body.msg, {parse_mode: 'Markdown'});
    };
  } catch(error) {
    // Если произошла ошибка при отправке нашего сообщения, то мы
    // может войти в консоль Vercel
    console.error('Ошибка отправки сообщения');
    console.log(error.toString());
  };
  // Подтвердить сообщение с помощью Telegram
  // отправив код состояния HTTP 200
  //response.send('OK');
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
};

export default handler