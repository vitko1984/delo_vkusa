import type { VercelRequest, VercelResponse } from '@vercel/node';

export default const handlerWebhook = (request: VercelRequest, response: VercelResponse): void; new(): any; }; }; },) => {
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}