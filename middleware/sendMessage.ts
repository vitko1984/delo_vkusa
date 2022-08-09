import fetch from 'node-fetch';

const handleFetch = async (chatId: any, text: any) => {
    const message = `✅ Спасибо за ваше сообщение: *"${text}"*\nхорошего дня! 👋🏻`; 
    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${message}&parse_mode=Markdown`;
    const res = await fetch(url, {method: 'post'});
    res.ok && console.log('Сеанс связи с телеграм прошел успешно...');
    return true;
};

export default handleFetch;