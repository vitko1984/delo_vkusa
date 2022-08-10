exports.handler = async (event: { headers: { [x: string]: any; }; }, _: any, callback: (arg0: null, arg1: { statusCode: number; body: any; }) => void) => {
    const ip = event.headers['x-forwarded-for'];
    const client = ip.split(',')[0];
    callback(null, {
      statusCode: 200,
      body: client,
    });
  };