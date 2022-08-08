import { Handler } from "@netlify/functions";

/*exports.handler = async (event: { body: any; }) => {
  console.log("Received an update from Telegram!", event.body);
  return { statusCode: 200 };
};*/

const handler: Handler = async (event, context) => {
  console.log("Received an update from Telegram!", event.body);
  return { statusCode: 200 };
};
  
export { handler };