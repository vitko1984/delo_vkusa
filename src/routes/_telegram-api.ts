import TelegramBot from 'node-telegram-bot-api';

const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN, userId = import.meta.env.VITE_TELEGRAM_UID;
const bot = new TelegramBot(token, { polling: true });

const api:any = {};

api.GET = () => (req: any, res: any, next: any) => {};
api.POST = () => (req: { body: { subject: any; name: any; phone: any; question: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: Error): void; new(): any; }; }; }, next: any) => {
  const fields = `
    ${req.body.subject}
    От: ${req.body.name} 
    Телефон: ${req.body.phone}

    ${req.body.question}`; 
  bot.sendMessage(userId, fields);
  bot.on('polling_error', (error) => {
    return res.status(400).json(error);
  });
  return res.status(200).json({
    message: "Запрос успешно отправлен в Телеграм...",
    name: ''
  });      
};

console.log("Из telegram-api...");

export default api;