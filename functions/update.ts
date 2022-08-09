import { Handler } from "@netlify/functions";
import sendMessage from '../middleware/sendMessage';

const handler: Handler = async (event, context) => {
  console.log("Получил обновление от Telegram!", event.body);
  const chatId = event.body && JSON.parse(event.body).message.chat.id;
  const text = event.body && JSON.parse(event.body).message.text;
  await sendMessage(chatId, text);
  return { statusCode: 200 };
};
  
export { handler };