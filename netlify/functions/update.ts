import { Handler } from "@netlify/functions";

/*exports.handler = async (event: { body: any; }) => {
  console.log("Received an update from Telegram!", event.body);
  return { statusCode: 200 };
};*/

const handler: Handler = async (event, context) => {
  console.log("Received an update from Telegram!", event.body);
  const chatId = JSON.parse(event.body).message.chat.id;
  const text = 'Я получил твое сообщение!';
  const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${text}`;
  const res = await fetch(url);
  res.ok && console.log('Сеанс связи с телеграм прошел успешно...');
  return { statusCode: 200 };
};
  
export { handler };