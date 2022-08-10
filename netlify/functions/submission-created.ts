import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Good morning!' }),
  };
}; 
  
export { handler };