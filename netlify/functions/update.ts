import { Handler } from "@netlify/functions";
//import sendMessage from '../../middleware/sendMessage';

const handler: Handler = async (event, context) => {
  console.log("Получил обновление от Telegram!", event.body);
  const chatId = event.body && JSON.parse(event.body).message.chat.id;
  const text = event.body && JSON.parse(event.body).message.text;
  //sendMessage(chatId, text);
  const message = `✅ Спасибо за ваше сообщение: *"${text}"*\nхорошего дня! 👋🏻`; 
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${message}&parse_mode=Markdown`;
  const res = await fetch(url, {method: 'post'});
  res.ok && console.log('Сеанс связи с телеграм прошел успешно...');
  return { statusCode: 200 };
};
  
export { handler };