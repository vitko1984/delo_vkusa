import type { VercelRequest, VercelResponse } from '@vercel/node';
import TelegramBot from 'node-telegram-bot-api';

//const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN, userId = import.meta.env.VITE_TELEGRAM_UID;

module.exports = async (request: VercelRequest, response: VercelResponse) => {
  try {
    // Создаем новый обработчик бота с токеном
    // что дал нам Botfather
    // Использовать переменную окружения, чтобы не показывать ее в нашем коде
    //const bot = new TelegramBot(token, { polling: true });
    const bot = new TelegramBot('1479357668:AAFtfLRCDmRmDNyHAk16XXuqq18WsPu4OOc')
    // Получаем тело POST-запроса, отправленного из Telegram
    const { body } = request;
    // Убедитесь, что это отправляемое сообщение
    if (body.message) {
      // Получаем идентификатор этого чата
      // и текст, который отправил пользователь
      const { chat: { id }, text } = body.message;
      // Создаем сообщение для отправки обратно
      // Мы можем использовать Markdown внутри этого
      const message = `✅ Спасибо за ваше сообщение: *"${text}"*\nхорошего дня! 👋🏻`;
      // Отправляем наше новое сообщение обратно в Markdown
      await bot.sendMessage(id, message, {parse_mode: 'Markdown'});
    };
  } catch(error) {
    // Если произошла ошибка при отправке нашего сообщения, то мы
    // может войти в консоль Vercel
    console.error('Ошибка отправки сообщения');
    console.log(error.toString());
  };
  // Подтвердить сообщение с помощью Telegram
  // отправив код состояния HTTP 200
  response.send('OK');
};