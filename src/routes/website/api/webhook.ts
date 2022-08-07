export default function handler(request: { body: any; query: any; cookies: any; }, response: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { body: any; query: any; cookies: any; }): void; new(): any; }; }; },){
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}