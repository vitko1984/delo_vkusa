import prisma from './_db';
import type { EndpOutp } from '../lib/types';

/*type Goods = {create?: object[]} | {createMany: {data: object[]}} | {upsert: {create: {data: object[]}, update: {data: object[]}}};

class DBError extends Error {
	constructor(message: string) {
	  super(message); // (1)
	  this.name = "Ошибка БД"; // (2)
	};
};*/

export async function api(
  db_name: string,
	method: string,
	reqObj?: object,	
): Promise<EndpOutp> {
  console.log('api_data', reqObj);
  let body = {};
  switch (method.toUpperCase()) {
    case "DELETE":
      await prisma[db_name].delete(reqObj);
      break;
    case "DELETE_MANY":
      await prisma[db_name].deleteMany(reqObj);
      break;  
    case "GET_MANY":
      body = await prisma[db_name].findMany(reqObj);
      break;
    case "GET":
      body = await prisma[db_name].findUnique(reqObj);
      break;
    case "UPDATE":
      body = await prisma[db_name].update(reqObj);
      break;
    case "UPDATE_MANY":
      body = await prisma[db_name].updateMany(reqObj);
      break;  
    case "POST":
      body = await prisma[db_name].create(reqObj);
      break;
    case "POST_MANY":
      body = await prisma[db_name].createMany(reqObj);
      break;
    case "UPSERT":
      body = await prisma[db_name].upsert(reqObj);
      break;
    case "DISCONNECT":
      await prisma.$disconnect();
      break;
  };
  
  return {
    body
  };  
};