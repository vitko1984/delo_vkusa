exports.handler = async (event: { body: any; }) => {
  console.log("Received an update from Telegram!", event.body);
  return { statusCode: 200 };
};